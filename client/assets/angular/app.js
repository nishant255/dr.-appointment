console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config( function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/myPartial.html',
      controller: 'myController',
      controllerAs: 'MC'
    })

    .otherwise({
      redirectTo: '/'
    });

});
