import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import Navigation from "../Navigation/Navigation"
import logo from "../../images/logo.svg"
import account from "../../images/account-btn.svg"
import menu from "../../images/menu-button.svg"

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = React.useState(false)

  // Функция для смены цвета для ссылки
  const setActive = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpen() {
    setIsClicked(true)
  }

  function handleClose() {
    setIsClicked(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link type="button" to="/" className="logo">
            <img src={logo} alt="Логотип приложения" />
          </Link>
          <nav className="header__button-container">
            <Link type="button" to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link
              type="button"
              to="/signin"
              className="header__button header__button-black"
            >
              Войти
            </Link>
          </nav>
        </header>
      ) : (
        <header className="header header_white">
          <Link type="button" to="/" className="logo">
            <img src={logo} alt="Логотип приложения" />
          </Link>
          <nav className="header__button-container-cards">
            <NavLink to="/movies" type="button" className={setActive}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" type="button" className={setActive}>
              Сохранённые&nbsp;фильмы
            </NavLink>
          </nav>
          <nav className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="Кнопка входа в аккаунт"
                type="button"
              />
            </Link>
            <button
              type="button"
              className="header__menu-button"
              onClick={handleOpen}
            >
              <img src={menu} alt="Кнопка меню" />
            </button>
          </nav>
          {isClicked ? <Navigation handleClose={handleClose} /> : ""}
        </header>
      )}
    </>
  )
}

export default Header
