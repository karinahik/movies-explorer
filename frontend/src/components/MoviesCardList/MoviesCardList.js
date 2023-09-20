import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./MoviesCardList.css"
import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"
import {
  DESKTOP_FILMS,
  TABLET_FILMS,
  MOBILE_FILMS,
} from "../../utils/constants"
import SearchError from "../SearchError/SearchError"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,

  handleLikeFilm,
  ondeleteFilm,
  isReqError,
  isNotFound,
}) {
  const { pathname } = useLocation()
  const [shownMovies, setShownMovies] = useState(0)

  function showFilmDisplay() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(12) // 12 карточек
    } else if (display > 767) {
      setShownMovies(8) // 8 карточек
    } else {
      setShownMovies(5) // 5 карточек
    }
  }

  function showFilmDisplayClickButton() {
    const display = window.innerWidth
    if (display > 1180) {
      setShownMovies(shownMovies + DESKTOP_FILMS)
    } else if (display > 767) {
      setShownMovies(shownMovies + TABLET_FILMS)
    } else {
      setShownMovies(shownMovies + MOBILE_FILMS)
    }
  }

  useEffect(() => {
    showFilmDisplay()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", showFilmDisplay)
    }, 500)
  })

  function getSaveMovie(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="cards__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    cards={cards}
                    card={card}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    ondeleteFilm={ondeleteFilm}
                    saved={getSaveMovie(savedMovies, card)}
                  />
                ))}
              </ul>
              <div className="cards__button-container"></div>
            </>
          ) : (
            <>
              <ul className="cards__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    cards={cards}
                    card={card}
                    savedMovies={savedMovies}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    ondeleteFilm={ondeleteFilm}
                    saved={getSaveMovie(savedMovies, card)}
                  />
                ))}
              </ul>
              <div className="cards__button-container">
                {cards.length > shownMovies ? (
                  <button
                    className="cards__button"
                    onClick={showFilmDisplayClickButton}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
