import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const refAvatarUrl = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: refAvatarUrl.current.value
        });
        refAvatarUrl.current.value = '';
    }

    return (
        <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input ref ={refAvatarUrl} type="url" name="link" className="modal__item modal__item_type_url-image" placeholder="Ссылка на картинку" id="url" />
            <span className="modal__error modal__error_visible" id="url-error"></span>
            <button type="submit" className="modal__save-button"><span className="modal__name-button">Сохранить</span></button>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;