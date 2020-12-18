const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find()
    .populate('user')
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Карточки не подтянулись' });
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createCard = (req, res) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(400).send({ message: 'Неккоректные данные карточки' });
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      if (card.owner === req.user._id) {
        return res.send(card);
      }
      return res.status(403).send({ message: 'Вы не можете удалить карточку другого пользователя' });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(404).send({ message: 'Карточка не найдена' });
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      res.status(404).send({ message: 'Карточка не лайкнулась' });
      return;
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(404).send({ message: 'Карточка не лайкнулась' });
    return res.status(500).send({ message: 'Ошибка на сервере' });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((data) => {
    if (!data) {
      res.status(404).send({ message: 'Like не убрался' });
      return;
    }
    res.send(data);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(404).send({ message: 'Like не убрался' });
    return res.status(500).send({ message: 'Ошибка на сервере' });
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
