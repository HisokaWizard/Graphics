function ViewModel() {
    var self = this;
    self.DataCountries = Countries; // тут может быть запрос на сервер, но т к в данной работе сервера нет, я просто беру данные из мнимой базы данных
    self.DataCities = Cities;
    self.DataSchools = Schools;
    self.DataUniversities = Univercities;

    self.userCount = [25, 50, 75, 100];
    self.gender = ko.observableArray(["Не выбран", "Мужской", "Женский"]);
    self.choice = [];
    self.choice[0] = {ids : "id", name : "Только Id"}; 
    self.choice[1] = {ids : "profile", name : "Профили"}; 
    self.choice[2] = {ids : "extended", name : "Расширенный поиск"};

    self.countries = ko.observableArray(self.DataCountries);
    self.cities = ko.observableArray([]);
    self.schools =  ko.observableArray([]);
    self.univercities =  ko.observableArray([]);
    self.friends = ko.observableArray(self.choice);
    self.subscribers = ko.observableArray(self.choice);
    self.relatives = ko.observableArray(self.choice);

    self.countrySelectedGeoLocation = ko.observable();
    self.countrySelectedMiddleStudy = ko.observable();
    self.countrySelectedHighStudy = ko.observable();
    self.citySelectedGeoLocation = ko.observable();
    self.citySelectedMiddleStudy = ko.observable();
    self.citySelectedHighStudy = ko.observable();
    self.schoolSelected = ko.observable();
    self.univercitySelected = ko.observable();
    self.genderSelected = ko.observable();
    self.friendSelected = ko.observable();
    self.subscriberSelected = ko.observable();
    self.relativeSelected = ko.observable();
    self.userCountFriendSelected = ko.observable();
    self.userCountSubscruberSelected = ko.observable();
    self.userCountRelativeSelected = ko.observable();

    self.id = ko.observable('');
    self.fullName = ko.observable('');
    self.nickName = ko.observable('');
    self.minAge = ko.observable('');
    self.maxAge = ko.observable('');
    self.company = ko.observable('');
    self.post = ko.observable('');    
    self.borndate= ko.observable('');
    self.groupid = ko.observable('');
    self.listUser = ko.observable(false);
    self.statisticUser = ko.observable(false);
    self.photofriendB = ko.observable(false);
    self.bigphotofriendB = ko.observable(false);
    self.photosubscriberB = ko.observable(false);
    self.bigphotosubscriberB = ko.observable(false);
    self.photorelativeB = ko.observable(false);
    self.bigphotorelativeB = ko.observable(false);

    //код дублированный, но только потому что данные в базе данных постороены по одной структуре, по факту, для каждого из 
    //типа списка может быть своя структура данные, со своими полями и логикой, пожтому для каждого select я использую свой метод
    //создания объекта с данными

    self.cityInitGeoLocation = function(){
       return self.cityInit(self.countrySelectedGeoLocation(), self.cities);
    }

    self.cityInitMiddleStudy = function(){
        return self.cityInit(self.countrySelectedMiddleStudy(), self.schools);
    }

    self.cityInitHighStudy = function(){
        return self.cityInit(self.countrySelectedHighStudy(), self.univercities);
    }

    self.cityInit = function (selected, cities){ 
        var _cities = [];
        for(var country in self.DataCountries){
            if(undefined !== selected){
                if(self.DataCountries[country].id === selected.id){
                    for(var city in self.DataCities){
                        if(self.DataCountries[country].id === self.DataCities[city].country_id){
                            _cities.push(self.DataCities[city]);
                        }
                    }  
                }
            }
        }
        if(0 !== _cities.length){
           return cities = ko.observableArray(_cities);
        }
        return "null";
    };

    self.schoolInit = function (){
        var _schools = [];
        for(var city in self.DataCities){
            var selected = self.citySelectedMiddleStudy();
            if(undefined !== selected){
                if(self.DataCities[city].id === selected.id){
                    for(var school in self.DataSchools){
                        if(self.DataCities[city].id === self.DataSchools[school].city_id){
                            _schools.push(self.DataSchools[school]);
                        }
                    }  
                }
            }
        }
        if(0 !== _schools.length){
           return self.schools = ko.observableArray(_schools);
        }
        return "null";
    };

    self.unversityInit = function (){
        var _univercities = [];
        for(var city in self.DataCities){
            var selected = self.citySelectedHighStudy();
            if(undefined !== selected){
                if(self.DataCities[city].id === selected.id){
                    for(var univercity in self.DataUniversities){
                        if(self.DataCities[city].id === self.DataUniversities[univercity].city_id){
                            _univercities.push(self.DataUniversities[univercity]);
                        }
                    }  
                }
            }
        }
        if(0 !== _univercities.length){
           return self.univercities = ko.observableArray(_univercities);
        }
        return "null";
    };


    self.getfriendForm = function(){
        if(self.friendSelected().ids === "extended"){
            return {};
        } else {
           return undefined;
        }
    };

    self.getsubscriberForm = function(){
        if(self.subscriberSelected().ids === "extended"){
            return {};
        } else {
           return undefined;
        }
    };

    self.getrelativeForm = function(){
        if(self.relativeSelected().ids === "extended"){
            return {};
        } else {
           return undefined;
        }
    };

    self.createJSON = function(){
        var json = [];
        var objectToJson = {};
        objectToJson["user_id"] = self.id();
        objectToJson["user_fullname"] = self.fullName();
        objectToJson["user_nickname"] = self.nickName()
        objectToJson["location"]={};
        objectToJson["location"]["country"] = self.countrySelectedGeoLocation();
        objectToJson["location"]["city"] = self.citySelectedGeoLocation();
        objectToJson["middlestudy"]={};
        objectToJson["middlestudy"]["country"] = self.countrySelectedMiddleStudy();
        objectToJson["middlestudy"]["city"] = self.citySelectedMiddleStudy();
        objectToJson["middlestudy"]["school"] = self.schoolSelected();
        objectToJson["highstudy"]={};
        objectToJson["highstudy"]["country"] = self.countrySelectedHighStudy();
        objectToJson["highstudy"]["city"] = self.citySelectedHighStudy();
        objectToJson["highstudy"]["university"] = self.univercitySelected();
        objectToJson["gender"] = self.genderSelected();
        objectToJson["minage"] = self.minAge();
        objectToJson["maxage"] = self.maxAge();
        objectToJson["borndate"] = self.borndate();
        objectToJson["company"] = self.company();
        objectToJson["post"] = self.post();
        objectToJson["groupid"] = self.groupid();
        objectToJson["listuser"] = self.listUser();
        objectToJson["statisticuser"] = self.statisticUser();
        objectToJson["friendlist"] = {};
        objectToJson["friendlist"]["typeofsearch"] = self.friendSelected();
        objectToJson["friendlist"]["friendphoto"] = self.photofriendB();
        objectToJson["friendlist"]["bigfriendphoto"] = self.bigphotofriendB();
        objectToJson["friendlist"]["friendcount"] = self.userCountFriendSelected();
        objectToJson["subscriberlist"] = {};
        objectToJson["subscriberlist"]["typeofsearch"] = self.subscriberSelected();
        objectToJson["subscriberlist"]["friendphoto"] = self.photosubscriberB();
        objectToJson["subscriberlist"]["bigfriendphoto"] = self.bigphotosubscriberB();
        objectToJson["subscriberlist"]["friendcount"] = self.userCountSubscruberSelected();
        objectToJson["relativelist"] = {};
        objectToJson["relativelist"]["typeofsearch"] = self.relativeSelected();
        objectToJson["relativelist"]["friendphoto"] = self.photorelativeB();
        objectToJson["relativelist"]["bigfriendphoto"] = self.bigphotorelativeB();
        objectToJson["relativelist"]["friendcount"] = self.userCountRelativeSelected();
        json = JSON.stringify(objectToJson);   
        console.log(json);
    }

};

ko.applyBindings(new ViewModel());