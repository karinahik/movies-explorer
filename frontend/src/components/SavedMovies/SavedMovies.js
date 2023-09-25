import React, { useState, useEffect } from "react"
import Header from "../Header/Header"
import { filterMovies, filterDurationMovie } from "../../utils/utils"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"

function SavedMovies({ loggedIn, savedMovies, ondeleteFilm }) {
  const [filteredMovies, setFilteredMovies] = useState(savedMovies)
  const [isShortFilm, setisShortFilm] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  function getSearchMovies(query) {
    setSearchQuery(query)
  }

  function getShortMovie() {
    setisShortFilm(!isShortFilm)
  }

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery)
    setFilteredMovies(
      isShortFilm ? filterDurationMovie(moviesCardList) : moviesCardList
    )
  }, [savedMovies, isShortFilm, searchQuery])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onFilterMovies={getShortMovie}
        getSearchMovies={getSearchMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isSavedFilms={true}
        savedMovies={savedMovies}
        ondeleteFilm={ondeleteFilm}
        isNotFound={isNotFound}
      />
      <Footer />
    </section>
  )
}

export default SavedMovies
