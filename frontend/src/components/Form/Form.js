import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/logo.svg"

function Form({
  title,
  isLoading,
  children,
  buttonText,
  question,
  linkText,
  link,
  isDisabled,
  onSubmit,
}) {
  return (
    <section className="form">
      <Link to="/" className="logo">
        <img src={logo} alt="Логотип" />
      </Link>
      <h1 className="form__title">{title}</h1>
      <form className="forma" id="form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          disabled={isDisabled ? true : false}
          className={
            isDisabled || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </section>
  )
}

export default Form
