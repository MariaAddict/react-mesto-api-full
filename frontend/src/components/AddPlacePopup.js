import React from 'react';
import PopupWithForm from './PopupWithForm';
import PropTypes from 'prop-types';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNewName(evt) {
        setName(evt.target.value);
    }

    function handleNewLink(evt) {
        setLink(evt.target.value);
    }

    function handleAddPlacePopupSubmit(evt) {
        evt.preventDefault();
        onAddPlace({ name, link });
        setName('');
        setLink('');
    }


    return (
        <PopupWithForm name='add' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlacePopupSubmit} >
            <input type="text" name="name" className="modal__item modal__item_type_header-image" placeholder="Название" id="name"
                onChange={handleNewName} value={name} />
            <span className="modal__error modal__error_visible" id="name-error"></span>
            <input type="url" name="link" className="modal__item modal__item_type_url-image" placeholder="Ссылка на картинку"
                id="url" onChange={handleNewLink} value={link} />
            <span className="modal__error modal__error_visible" id="url-error"></span>
            <button type="submit" className="modal__save-button"><span className="modal__name-button">Создать</span></button>
        </PopupWithForm>
    );
}

AddPlacePopup.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onAddPlace: PropTypes.func.isRequired
}

export default AddPlacePopup;