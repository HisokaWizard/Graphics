'use strict';

(function() {
  angular.module('app', [
    'ngRoute'
  ]).
  constant('appInfo', {
      substance_name : 'Название вещества',
      Cq : 'Параметр Cq'
    }).
  config(function($routeProvider) {
      $routeProvider
      .when('/', {
          templateUrl: "frontend/html/view.html"
      })
      .otherwise({
          templateUrl: "frontend/html/view.html"
      });
  });
})();