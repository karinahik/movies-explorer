import React, { useState, useEffect } from "react"
import "./SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"

function SearchForm({ getSearchMovies, onFilterMovies, isShortFilm }) {
  const [isQueryError, setIsQueryError] = useState(false)
  const [query, setQuery] = useState("")
  const location = useLocation()

  function getChangeQueryInput(e) {
    setQuery(e.target.value)
  }

  function getSubmitFormRegister(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      getSearchMovies(query)
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  return (
    <div className="search">
      <form className="search__form" id="form" onSubmit={getSubmitFormRegister}>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={getChangeQueryInput}
          value={query || ""}
        ></input>
        <button className="search__button" type="submit">
          Найти
        </button>
        <FilterCheckbox
          onFilterMovies={onFilterMovies}
          isShortFilm={isShortFilm}
        />

        {isQueryError && (
          <span className="search__form-error">
            Нужно ввести ключевое слово
          </span>
        )}
      </form>
    </div>
  )
}

export default SearchForm
