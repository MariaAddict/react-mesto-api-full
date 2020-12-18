import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
    const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({ about: '', avatar: '', email: '', name: '', _id: '' });
    const [cards, setCards] = React.useState([]);
    const [headerLink, setHeaderLink] = React.useState({
        name: '',
        url: ''
    });
    const location = useLocation();
    const [loggedIn, setLoggetIn] = React.useState(false);
    const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
    const [registered, setRegistered] = React.useState(false);
    const history = useHistory();
    const [email, setEmail] = React.useState('');

    React.useEffect(() => {
        if (location.pathname === '/') {
        Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([dataUser, dataCards]) => {
            setCurrentUser(dataUser);
            setCards(dataCards);
        }).catch(err => {
            console.log(err);
        });
    }
    }, [location]);

    React.useEffect(() => {
        if (location.pathname === '/sign-in') {
            setHeaderLink({
                name: 'Регистрация',
                url: '/sign-up'
            });
        };
        if (location.pathname === '/sign-up') {
            setHeaderLink({
                name: 'Вход',
                url: '/sign-in'
            });
        };
        if (location.pathname === '/') {
            setHeaderLink({
                name: 'Выйти',
                url: '/sign-in'
            });
        };
    }, [location]);

    React.useEffect(() => {
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    function handleEditAvatarClick() {
        setisEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setisEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setisAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function closeAllPopups() {
        setisAddPlacePopupOpen(false);
        setisEditProfilePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setIsInfoToolOpen(false);
        setSelectedCard({});
    }
    function handleUpdateUser(data) {
        api.editUserInfo(data).then((res) => {
            setCurrentUser(res);
            setisEditProfilePopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }
    function handleUpdateAvatar(data) {
        api.changeAvatar(data).then((avatar) => {
            setCurrentUser(avatar);
            setisEditAvatarPopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);

        api.changeLike(card._id, !isLiked).then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter((c) => {
                return !(c._id === card._id)
            });
            setCards(newCards);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card).then((newCard) => {
            setCards([newCard, ...cards]);
            setisAddPlacePopupOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleRegister(password, email) {
        console.log("user: ", password, email);
        auth.register(password, email)
            .then(data => {
                console.log(data);
                if (data) {
                    setRegistered(true);
                    setIsInfoToolOpen(true);
                }
            })
            .catch(err => {
                console.log(err);
                setRegistered(false);
                setIsInfoToolOpen(true);
            });
    }

    function onLogin(password, email) {
        auth.authorization(password, email)
            .then(data => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setEmail(email);
                    setLoggetIn(true);
                    history.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    function checkToken() {
        const jwt = localStorage.getItem('jwt');
        auth.getContent(jwt)
            .then(data => {
                if (data) {
                    setEmail(data.email);
                    setLoggetIn(true);
                    history.push('/');
                }
                else {
                    history.push('/sign-in');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setEmail('');
        setLoggetIn(false);
    }


    return (
        < CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <Header link={headerLink} onSignOut={signOut} email={email} loggedIn={loggedIn} />

                    <Switch>

                        <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleCardDelete}
                            onCardLike={handleCardLike}
                            cards={cards}
                        />
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                            <InfoTooltip registered={registered} isOpen={isInfoToolOpen} onClose={closeAllPopups} history={history}></InfoTooltip>
                        </Route>
                        <Route path="/sign-in">
                            <Login onLogin={onLogin} />
                        </Route>
                    </Switch>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <ImagePopup {...selectedCard} onClose={closeAllPopups} />
                    {loggedIn && <Footer />}
                </div>
            </div>
        </ CurrentUserContext.Provider >
    );
}

export default App;