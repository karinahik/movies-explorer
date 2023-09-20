import React from "react"
import { movieDurationConvert } from "../../utils/utils"
import "./MoviesCard.css"
//import movies from "../../images/card-img.jpg";
import deleteButton from "../../images/d3.svg"

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  ondeleteFilm,
  saved,
  savedMovies,
}) {
  function onCardClick() {
    if (saved) {
      ondeleteFilm(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  function onDelete() {
    ondeleteFilm(card)
  }

  const cardLikeButtonClassName = `${
    saved ? "card__like-button card__like-button_active" : "card__like-button"
  }`

  return (
    <>
      <li className="card" key={card.id}>
        <div className="card__container">
          <a href={card.trailerLink} target="_blank" rel="noreferrer">
            <img
              className="card__image"
              alt={card.nameRU}
              src={
                isSavedFilms
                  ? card.image
                  : `https://api.nomoreparties.co/${card.image.url}`
              }
            />
          </a>
          {isSavedFilms ? (
            <button
              type="button"
              className="card__like-delite"
              onClick={onDelete}
            >
              <img
                className="card__like-delite"
                src={deleteButton}
                alt="удалить"
              />
            </button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            >
              {" "}
            </button>
          )}
          <div className="card__title-block">
            <h2 className="card__title">{card.nameRU}</h2>
            <span className="card__time">
              {movieDurationConvert(card.duration)}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}

export default MoviesCard
