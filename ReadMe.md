Создать форму, с использованием библиотек: knockout, durandal, bootstrap, select2, позволяющую формировать запрос по поиску пользователей. По кнопке отправить – в консоль должен выводиться сформированный 
JSON запроса, в соответствие с протоколом. В качестве образца можно смотреть как это реализовано в ВК. 
Пусть существуют rest методы для автодополнения по стране, городу, школе и университету:
searchCountries Request
{
  search: string,
  start: integer,
  length: integer
}
searchCountries Response
{
  data: [{
	name: string,
	id: integer
  }, …],
  recordsTotal: integer
}
Города могут иметь одинаковое название, но разный регион. Города должны сортироваться по названию, при этом города с флагом important должны находиться выше.
searchCities Request
{
        countryId: integer,
        search: string,
        start: integer,
        length: integer
}
searchCities Response
{
  data: [{
        id: integer
	   name: string,
        important: boolean,
        area: string,
        region: string,
        country: string, // country code
        countryId integer,
  }, …],
  recordsTotal: integer
}
searchUniversities Request
{
  cityId: integer,
  search: string,
  start: integer,
  length: integer
}
searchUniversities Response
{
  data: [{
	name: string,
	id: integer,
        cityId: integer
  }, …],
  recordsTotal: integer
}
searchSchools Request
{
  cityId: integer,
  search: string,
  start: integer,
  length: integer
}
searchSchools Response
{
  data: [{
	name: string,
	id: integer,
     cityId: integer
  }, …],
  recordsTotal: integer
}
Для управления рекурсивностью используется select, с опциями: "только id", "профили", "расширенный поиск". В случае, когда выбран расширенный поиск – отображается дополнительная рекурсивная секция (см. рисунок).
 
Выгрузка может производиться либо по идентификаторам, «никам» пользователей, либо по набору критериев:
Таблица 3.1 Уточненные критерии выгрузки информации о лицах ВК
Критерий	Наименование	Структура данных
Идентификаторы 	ids	[integer]
Ники пользователей	screenNames	[string]
ФИО, ключевые слова	query	string
Географический регион	Код страны	countryCode	ccode
	Идентификатор страны (код игнорируется)	countryId	integer
	Идентификатор города 	cityId	integer
Учебное заведение	Школа	school	Таблица 1.15 Школа, университет

	Университет	university	Таблица 1.15 Школа, университет

Возраст	Нижняя граница	ageFrom	integer
	Верхняя граница	ageTo	integer
	Дата рождения	birthdate	date
			
			
Пол	gender	Таблица 1.11 Пол

Работа	Название компании	companyName	string
	Название должности	jobName	string
Идентификатор группы, в которой состоит пользователь	groupId	integer
Выгружать списки пользователя	friendLists	boolean
Выгружать статистику по объектам пользователя	counters	boolean
Друзья пользователя	friends	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Подписчики пользователя	followers	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Родственники пользователя	relatives	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Таблица 1.15 Школа, университет
Поле	Наименование	Структура данных
Код страны	countryCode	ccode
Название города	cityName	string
Название 	name	string
Идентификатор (при указании id остальные параметры игнорируются)	id	string
Таблица 1.11 Пол
Наименование	Значение
Не указан	null
Мужской	m
Женский	f
Таблица 1.3 Критерии рекурсивной выгрузки для пользователей
Критерий	Наименование	Структура данных
Выгружать друзей пользователя
(ВК, ОК, Twitter, ЖЖ)	friends	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Выгружать родственников пользователя
(ВК, ОК)	relatives	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Выгружать подписчиков пользователя (ВК, Twitter, ЖЖ)	followers	Таблица 1.3 Критерии рекурсивной выгрузки для пользователей

Выгружать только идентификаторы пользователей	onlyIds	boolean
Выгружать фотографию пользователя	photo	boolean
Выгружать большую фотографию пользователя	photoLarge	boolean 
Максимальное количество пользователей, выгружаемых по данному критерию (например, первые 100 друзей или первые 100 членов сообщества)	limit	integer

