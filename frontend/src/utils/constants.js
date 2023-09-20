// регулярное выражение для проверки ввода почты
const REGULAR_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

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

export {
  REGULAR_EMAIL,
  REGULAR_NAME,
  MAX_SHORT_DURATION,
  DESKTOP_FILMS,
  TABLET_FILMS,
  MOBILE_FILMS,
}
