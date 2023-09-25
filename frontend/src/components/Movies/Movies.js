import React, { useState, useEffect } from "react"
import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm"
import { filterMovies, filterDurationMovie } from "../../utils/utils"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import * as movies from "../../utils/MoviesApi"

function Movies({ loggedIn, handleLikeFilm, ondeleteFilm, savedMovies }) {
  // Состояниe компонента
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [isReqError, setisReqError] = useState(false)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortFilm, setisShortFilm] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  function getEditFilterMovies(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(
      short ? filterDurationMovie(moviesCardList) : moviesCardList
    )
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  function getShortMovie() {
    setisShortFilm(!isShortFilm)
    if (!isShortFilm) {
      if (filterDurationMovie(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDurationMovie(initialCardsMovies))
      } else {
        setFilteredMovies(filterDurationMovie(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortFilm)
  }

  function getSearchMovies(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortFilm)
    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      getEditFilterMovies(movies, query, isShortFilm)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsFilm) => {
          getEditFilterMovies(cardsFilm, query, isShortFilm)
          setisReqError(false)
          console.log(cardsFilm)
        })
        .catch((err) => {
          setisReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem("movieSearch")) {
  //     if (filteredMovies.length === 0) {
  //     } else {
  //       setIsNotFound(false)
  //     }
  //   }
  // }, [filteredMovies])
  
  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      setIsNotFound(filteredMovies.length === 0)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setisShortFilm(true)
    } else {
      setisShortFilm(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDurationMovie(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  return (
    <main className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        getSearchMovies={getSearchMovies}
        isShortFilm={isShortFilm}
        onFilterMovies={getShortMovie}
      />
      <MoviesCardList
        isLoading={isLoading}
        cards={filteredMovies}
        savedMovies={savedMovies}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
        handleLikeFilm={handleLikeFilm}
        ondeleteFilm={ondeleteFilm}
      />
      <Footer />
    </main>
  )
}

export default Movies
