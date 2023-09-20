import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import useForm from "../hooks/useForm"
import { REGULAR_EMAIL, REGULAR_NAME } from "../../utils/constants"

function Register({ onRegister, isLoading }) {
  // хук useForm
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function getSubmitFormRegister(evt) {
    evt.preventDefault()
    onRegister({
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <main>
      <Form
        title="Добро пожаловать!"
        buttonText="Зарегистрироваться"
        question="Уже зарегистрированы?"
        linkText=" Войти"
        link="/signin"
        onSubmit={getSubmitFormRegister}
        isDisabled={!isFormValid}
        isLoading={isLoading}
      >
        <label className="form__label">
          Имя
          <input
            name="name"
            className="form__input"
            id="name-input"
            type="text"
            minLength="2"
            maxLength="40"
            required
            placeholder="Ваше имя"
            onChange={handleChangeInput}
            value={enteredValues.name || ""}
            pattern={REGULAR_NAME}
          />
          <span className="form__input-error">{errors.name}</span>
        </label>
        <label className="form__label">
          E-mail
          <input
            name="email"
            className="form__input"
            id="email-input"
            type="email"
            required
            placeholder="Ваш Email"
            onChange={handleChangeInput}
            pattern={REGULAR_EMAIL}
            value={enteredValues.email || ""}
          />
          <span className="form__input-error">{errors.email}</span>
        </label>
        <label className="form__label">
          Пароль
          <input
            name="password"
            className="form__input"
            id="password-input"
            type="password"
            minLength="8"
            maxLength="12"
            required
            placeholder="Ваш пароль"
            onChange={handleChangeInput}
            value={enteredValues.password || ""}
          />
          <span className="form__input-error">{errors.password}</span>
        </label>
      </Form>
    </main>
  )
}

export default Register
