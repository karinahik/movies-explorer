import React from "react"
import { Link, NavLink } from "react-router-dom"
import "./Navigation.css"
import account from "../../images/account-btn.svg"

function Navigation({ handleClose }) {
  // Функция смены цвета ссылки
  const setActive = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__menu">
        <button
          type="button"
          className="navigation__close-button"
          onClick={handleClose}
        ></button>
        <nav className="navigation__links">
          <NavLink
            exact
            to="/"
            className={setActive}
            type="button"
            onClick={handleClose}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={setActive}
            type="button"
            onClick={handleClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={setActive}
            type="button"
            onClick={handleClose}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          type="button"
          to="/profile"
          className="navigation__account-button"
          onClick={handleClose}
        >
          <img src={account} alt="Кнопка с надписью аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
