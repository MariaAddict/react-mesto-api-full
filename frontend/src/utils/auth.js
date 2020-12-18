export const BASE_URL = "http://api.mortany.students.nomoredomains.monster";

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password  })
    })
        .then((response) => response.ok ? response.json() : Promise.reject(`ошибка: ${response.status}`));
};

export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((response) => response.ok ? response.json() : Promise.reject(`ошибка: ${response.status}`));
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then((response) => response.ok ? response.json() : Promise.reject(`ошибка: ${response.status}`));
};