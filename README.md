# movies-explorer-api

 Дипломная работа в рамках обучения в школе [Яндекс Практикум](https://practicum.yandex.ru/). </br>
 Репозиторий для back-end приложения по поиску фильмов. 

 ## Возможности back-end
 * Авторизация и регистрация пользователей
 * Добавление фильмов в "Избранное"

Ссылка на  API: https://diplom.mickkrishtopa.nomoredomains.sbs

## Роутинг API:
* POST /signup - создаёт пользователя с переданными в теле email, password и name
* POST /signin - проверяет переданные в теле почту и пароль
* GET /users/me - возвращает информацию о пользователе (email и имя)
* PATCH /users/me - обновляет информацию о пользователе (email и имя)
* GET /movies - возвращает все сохранённые текущим пользователем фильмы
* POST /movies - создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
* DELETE /movies/_id - удаляет сохранённый фильм по id