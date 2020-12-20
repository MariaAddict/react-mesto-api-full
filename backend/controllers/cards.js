const Card = require('../models/card');
const NotFoundError = require('../errors/not-found');
const ValidationError = require('../errors/validation-error');

const getCards = (req, res, next) => {
  Card.find()
    .populate('user')
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточки не подтянулись');
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new NotFoundError('Карточки не подтянулись');
        return next(error);
      }
      return next(err);
    });
};

const createCard = (req, res, next) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new ValidationError('Неккоректные данные карточки');
        return next(error);
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => Card.findById(req.params.id)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    if (JSON.stringify(card.owner) === JSON.stringify(req.user._id)) {
      return Card.findByIdAndRemove(req.params.id).then((data) => res.send(data));
    }
    const err = new Error('Вы не можете удалить карточку другого пользователя');
    err.statusCode = 403;
    return next(err);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new NotFoundError('Карточка не найдена');
      return next(error);
    }
    return next(err);
  });

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      throw new NotFoundError('Карточка не лайкнулась');
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new NotFoundError('Карточка не лайкнулась');
      return next(error);
    }
    return next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      throw new NotFoundError('Like не убрался');
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      const error = new NotFoundError('Like не убрался');
      return next(error);
    }
    return next(err);
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
