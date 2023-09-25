import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { REGULAR_EMAIL } from "../../utils/constants"
import useForm from "../hooks/useForm"

function Login({ onAuthorization, isLoading }) {
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function getSubmitFormRegister(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <main>
      <Form
        title="Рады видеть!"
        buttonText="Войти"
        question="Еще не зарегистрированы?"
        linkText=" Регистрация"
        link="/signup"
        onSubmit={getSubmitFormRegister}
        isDisabled={!isFormValid}
        isLoading={isLoading}
        noValidate
      >
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

export default Login
