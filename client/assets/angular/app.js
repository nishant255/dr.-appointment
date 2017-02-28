console.log("Loading Master App JS");

var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config( function ($routeProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'dashboardController',
      controllerAs: 'DC'
    })

    .when('/new_appointment', {
      templateUrl: 'partials/appointment.html',
      controller: 'appointmentController',
      controllerAs: 'AC'
    })

    .otherwise({
      redirectTo: '/'
    });

});
