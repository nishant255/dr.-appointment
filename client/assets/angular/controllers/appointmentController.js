console.log("Loading Clientside appointmentController.js");

app.controller('appointmentController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {

  var _this = this;
  _this.newAppointment = {};


  // -------------------------------------------------------------------------
  //                            Checking if user Exist
  // -------------------------------------------------------------------------
  var checkUser = function () {
    console.log("Checking User if logged if");
    userFactory.checkUser(function (returnedData) {
      console.log(returnedData);
      if (returnedData === false) {
        $location.url('/');
      } else {
        _this.user = returnedData;
      }
    });
  };
  checkUser();

  // -------------------------------------------------------------------------
  //                            Create Appointment
  // -------------------------------------------------------------------------
  _this.createAppointment = function () {

    userFactory.createAppointment(_this.newAppointment, function (appointmentFromServer) {
      console.log(appointmentFromServer);
      if (appointmentFromServer.error_message) {
        console.log("Error");
        _this.error_message = appointmentFromServer.error_message;
        return;
      }

      console.log("Appint Successfully");
      _this.newAppointment = {};
      $location.url('/');

    });

  }


  // -x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-
  //                           END CONTROLLER
  // -x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-x--x-x-x-
}]);

// -------------------------------------------------------------------------
//                            Filter for Title Case
// -------------------------------------------------------------------------

app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});


app.filter('date', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});
