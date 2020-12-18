import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = (props.owner === currentUser._id);
    const isLiked = props.likes.some((item) => item === currentUser._id);

    function handleClick() {
        props.onCardClick(props);
    }

    const handleLikeClick = () => {
        props.onCardLike(props);
    }

    const handleDeleteClick = () => {
        props.onCardDelete(props);
    }

    return (
        <li className="cards__item">
            <img src={props.link} alt={props.name} className="cards__image" onClick={handleClick} />
            <div className="cards__description">
                <h3 className="cards__title">{props.name}</h3>
                <div className="cards__likes">
                    <button type="button" onClick={handleLikeClick} className={`cards__like ${isLiked ? 'card__like_pressed' : ''}`}></button>
                    <p className="cards__number-of-likes">{props.likes.length}</p>
                </div>
            </div>
            <button type="button" className={`cards__delete ${isOwn ? '' : 'cards__delete_hidden'}`} onClick = {handleDeleteClick}></button>
        </li>
    );
}

export default Card;