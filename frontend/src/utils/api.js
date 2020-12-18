const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
}

class Api {
    constructor(url, { headers }) {
        this._url = url;
        this._headers = headers;
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(handleResponse)
    }

    addCard(card) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        }).then(handleResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(handleResponse)
    }

    editUserInfo(userInfo) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        }).then(handleResponse)
    }

    changeLike(cardId, like) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: like ? 'PUT' : 'DELETE',
            headers: this._headers
        }
        ).then(handleResponse)
    }

    changeAvatar(input) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: input.avatar
            })
        }
        ).then(handleResponse)
    }

    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }
}

//создание api
const api = new Api('http://api.mortany.students.nomoredomains.monster/', {
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
});

export default api;