import React, {useState} from 'react';

function Login({onLogin}) {
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
        onLogin(data.password, data.email);
    }

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form action="#" name="login-form" className= "login__form" onSubmit={handleSubmit} >
                <input type="email" name="email" className="login__input login__input_type_email"
                    placeholder="Email" value={data.email} onChange={handleChange}  />
                <input type="password" name="password" className="login__input login__input_type_password"
                    placeholder="Пароль" value={data.password} onChange={handleChange}  />
                <button type="submit" className="login__submit-button">Войти</button>
            </form>
        </div>
    );
}

export default Login;