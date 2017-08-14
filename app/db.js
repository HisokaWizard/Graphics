var Country = function(id, code, name){
    this.id = id;
    this.code = code;
    this.name = name;
}

var City = function(id, country_id, name, important){
    this.id = id;
    this.country_id = country_id;
    this.name = name;
    this.important = important;
}

var School = function(id, city_id, name){
    this.id = id;
    this.city_id = city_id;
    this.name = name;
}

var Univercity = function(id, city_id, name){
    this.id = id;
    this.city_id = city_id;
    this.name = name;
}

var Countries = [
    new Country("russia", "RUS", "Россия"),
    new Country("belorusia", "BLR", "Белорусия"),
    new Country("kazahstan", "KAZ", "Казахстан"),
    new Country("ukraina", "UKR", "Украина")
];

var Cities = [
    new City("moskow", "russia", "Москва", true),
    new City("spb", "russia", "Санкт-Петербург", true),
    new City("ekatburg", "russia", "Екатеринбург", false),
    new City("minsk", "belorusia", "Минск", true),
    new City("astana", "kazahstan", "Астана", true),
    new City("kiev", "ukraina", "Киев", true)
];

var Schools = [
    new School("moskow1", "moskow", "школа №1"),
    new School("moskow2", "moskow", "школа №2"),
    new School("moskow34", "moskow", "школа №34"),
    new School("spb1", "spb", "школа №1"),
    new School("spb12", "spb", "школа №12"),
    new School("spb35", "spb", "школа №35"),
    new School("minsk12", "minsk", "школа №12"),
    new School("astana64", "astana", "школа №64"),
    new School("kiev23", "kiev", "школа №23")
];

var Univercities = [
    new Univercity("moskowTehn", "moskow", "Технический университет Москвы"),
    new Univercity("moskowGym", "moskow", "Гуманитарный университет Москвы"),
    new Univercity("moskowSelsk", "moskow", "Сельскохозяйственный университет Москвы"),
    new Univercity("spbTehn", "spb", "Технический университет Санкт-Петербурга"),
    new Univercity("spbGym", "spb", "Гуманитарный университет Санкт-Петербурга"),
    new Univercity("spbSelsk", "spb", "Сельскохозяйственный университет Санкт-Петербурга"),
    new Univercity("minskTehn", "minsk", "Технический университет города Минска"),
    new Univercity("astanaGym", "astana", "Гуманитарный университет Астаны"),
    new Univercity("kievSelsk", "kiev", "Сельскохозяйственный университет Киева")
];

