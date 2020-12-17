import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`modal modal_type_${props.name} ${props.isOpen ? ('modal_opened') : ('')}`}>
            <div className="modal__container">
                <h2 className="modal__title">{props.title}</h2>
                <form action="#" name="modal-form" className={`modal__form modal__container_type_${props.name}`} onSubmit={props.onSubmit} >
                    {props.children}
                </form>
                <button type="button" className="modal__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;