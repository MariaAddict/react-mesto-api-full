import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(data.password, data.email);
    }

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form action="#" name="login-form" className= "login__form" onSubmit={handleSubmit} >
                <input type="email" name="email" className="login__input login__input_type_email"
                    placeholder="Email" value={data.email} onChange={handleChange}  />
                <input type="password" name="password" className="login__input login__input_type_password"
                    placeholder="Пароль"  value={data.password} onChange={handleChange}   />
                <button type="submit" className="login__submit-button" >Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="login__link">Уже зарегистрированы? Войти</Link>
        </div>
    );
}

export default Register;