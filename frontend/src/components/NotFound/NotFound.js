import React from "react"
import { useNavigate } from "react-router-dom"
import "./NotFound.css"

function NotFound() {
  const path = useNavigate()

  function goToPath() {
    path(-2)
  }

  return (
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__descrintion">Страница не найдена</p>
      <button type="button" onClick={goToPath} className="not-found__button">
        Назад
      </button>
    </main>
  )
}

export default NotFound
