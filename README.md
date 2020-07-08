## `Web-приложение учёта оборудования`
Реализут CRUD зданий, находящихся в ней комнат и оборудования.
Сделано согласно ТЗ описанному ниже.
[Baclend-часть](https://github.com/dgrtf/ConstructionReactWebServer)
[Docker](https://hub.docker.com/r/dgrtf/constructionreact)

### `Техническое задание:`

#### `Предметная область:`
Существует некоторая крупная организация.
Физически эта организация располагается в нескольких зданиях, каждое здание состоит из комнат.
В каждой комнате может располагаться некоторое оборудование.
#### `Задача:`
Необходимо создать приложение, в левой части которого можно будет просмотреть иерархию
зданий/комнат, а в правой части – просмотреть имеющееся в этом здании или комнате оборудование.
Оборудование здания = оборудование всех комнат здания.
Возле каждого здания и комнаты в левой части следует располагать индикатор, находится ли в нем/ней
оборудование.
Оборудование характеризуется наименованием и количеством.
Должна быть возможность работать с оборудованием в выбранной комнате: добавлять, редактировать,
удалять.
#### `Ограничения:`
Использовать при реализации VS2017, .NET 4.x, C#, ASP.NET WebApi 1/2 – ASP.NET CORE 1.x/2.0, HTML5, Angular
/ ReactJS, TypeScript, CSS.
Вызов просмотра содержимого здания/комнаты должен производиться без полной перерисовки страницы
(использовать AJAX).
Можно использовать контролы сторонних библиотек Angular / ReactJS.
Данные рекомендуется хранить в БД MS SQL Server.


### `Развёртывание (Linux)`
[Установите Docker Engine](https://docs.docker.com/engine/install/)
[Установите Docker Compose](https://docs.docker.com/compose/install/)
#### `Загрузите данные с репозитория:`
````
docker pull dgrtf/constructionreact
````
#### `Запустите приложение:`
````
docker-compose -f docker-compose.yml up
````


### `Запуск проекта`
````
npm start
````

### `Используемые технологии`

#### `Frontend:`
-React
-redux
-redux-thunk

#### `Bd:`
-PosgreSQL