import React, { useState, useEffect } from "react"
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"
import "./App.css"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Header from "../Header/Header"
import Main from "../Main/Main"
import Footer from "../Footer/Footer"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import SavedMovies from "../SavedMovies/SavedMovies"
import Profile from "../Profile/Profile"
import * as api from "../../utils/MainApi"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import InfoTooltipUpdate from "../infoTooltipUpdate/infoTooltipUpdate"
import NotFound from "../NotFound/NotFound"

function App() {
  const location = useLocation()
  const path = location.pathname
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [savedMovies, setSavedMovies] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false)
  const [isInfoToolTipUpdatePopupOpen, setInfoToolTipUpdatePopupOpen] =
    useState(false)
  const [isUpdate, setIsUpdate] = useState(false)

  function closeAllPopups() {
    setInfoToolTipPopupOpen(false)
    setInfoToolTipUpdatePopupOpen(false)
  }

  function closeByOverlay(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups()
    }
  }

  const isOpen = isInfoToolTipPopupOpen || isInfoToolTipUpdatePopupOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(path)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUser()
        .then((profileInfo) => {
          setCurrentUser(profileInfo)
        })
        .catch((err) => {
          console.log(err)
        })
      api
        .getMovies()
        .then((cardsFilm) => {
          console.log(cardsFilm)
          setSavedMovies(cardsFilm.reverse())
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  function registrationUser({ name, email, password }) {
    setIsLoading(true)
    api
      .register(name, email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(true)
        loginUser({ email, password })
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function loginUser({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setInfoToolTipPopupOpen(true)
          setIsSuccess(true)
          localStorage.setItem("jwt", res.token)
          navigate("/movies", { replace: true })
          setIsLoggedIn(true)
        }
      })
      .catch((err) => {
        setInfoToolTipPopupOpen(true)
        setIsSuccess(false)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function checkFilmLike(card) {
    api
      .addNewFilm(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        authorizationError(err)
      })
  }

  function checkFilmRemove(card) {
    api
      .deleteFilm(card._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== card._id))
      })
      .catch((err) => {
        setIsSuccess(false)
        console.log(err)
        authorizationError(err)
      })
  }

  function editUserInfo(newUserInfo) {
    setIsLoading(true)
    api
      .editUser(newUserInfo)
      .then((data) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        setInfoToolTipUpdatePopupOpen(true)
        setIsUpdate(false)
        console.log(err)
        authorizationError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function authorizationError(err) {
    if (err === "Error: 401") {
      getExitSite()
    }
  }

  const getExitSite = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("jwt")
    localStorage.removeItem("movies")
    localStorage.removeItem("shortMovies")
    localStorage.removeItem("allMovies")
    localStorage.removeItem("movieSearch")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Header loggedIn={isLoggedIn} />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route
              path={"/signin"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Login isLoading={isLoading} onAuthorization={loginUser} />
                )
              }
            />
            <Route
              path={"/signup"}
              element={
                isLoggedIn ? (
                  <Navigate to="/movies" replace />
                ) : (
                  <Register
                    isLoading={isLoading}
                    onRegister={registrationUser}
                  />
                )
              }
            />
            <Route path={"*"} element={<NotFound />} />
            <Route
              path={"/movies"}
              element={
                <ProtectedRoute
                  path="/movies"
                  component={Movies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  ondeleteFilm={checkFilmRemove}
                  handleLikeFilm={checkFilmLike}
                />
              }
            />
            <Route
              path={"/saved-movies"}
              element={
                <ProtectedRoute
                  path="/saved-movies"
                  component={SavedMovies}
                  loggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  ondeleteFilm={checkFilmRemove}
                />
              }
            />
            <Route
              path={"/profile"}
              element={
                <ProtectedRoute
                  path="/profile"
                  component={Profile}
                  loggedIn={isLoggedIn}
                  onUpdateUser={editUserInfo}
                  isLoading={isLoading}
                  signOut={getExitSite}
                />
              }
            />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
          <InfoTooltipUpdate
            isOpen={isInfoToolTipUpdatePopupOpen}
            isUpdate={isUpdate}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
