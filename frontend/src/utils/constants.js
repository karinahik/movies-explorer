// регулярное выражение для проверки ввода почты
const REGULAR_EMAIL = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+.[a-z]{2,}"

// регулярное выражение для проверки ввода имени
const REGULAR_NAME = "^[A-Za-zА-Яа-яЁё /s -]+$"

// длительность фильма 40 минут
const MAX_SHORT_DURATION = 40

//  3 элемента карточек
const DESKTOP_FILMS = 3
//  2 элемента карточек
const TABLET_FILMS = 2

//  2 элемента карточек
const MOBILE_FILMS = 2

// Константы цыфровые - разрешения экранов
const DESKTOP_DISPLAY = 1180
const TABLET_MOBILE_DISPLAY = 767

// Константы цыфровые - количество карточек
const COUNTER_CARDS_FILMS_XL = 12
const COUNTER_CARDS_FILMS_M = 8
const COUNTER_CARDS_FILMS_L = 5

export {
  REGULAR_EMAIL,
  REGULAR_NAME,
  MAX_SHORT_DURATION,
  DESKTOP_FILMS,
  TABLET_FILMS,
  MOBILE_FILMS,
  DESKTOP_DISPLAY,
  TABLET_MOBILE_DISPLAY,
  COUNTER_CARDS_FILMS_XL,
  COUNTER_CARDS_FILMS_M,
  COUNTER_CARDS_FILMS_L,
}
