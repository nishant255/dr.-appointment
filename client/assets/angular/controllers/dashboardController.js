console.log("Loading Clientside dashboardController.js");

app.controller('dashboardController', ['$scope', '$location', 'userFactory', function ($scope, $location, userFactory) {

  var _this = this;
  _this.users = [];
  _this.error_messages = [];
  _this.todayDate = new Date();
  console.log(_this.todayDate);

  // -------------------------------------------------------------------------
  //                            Get all the User
  // -------------------------------------------------------------------------
  var all_users = function () {
    userFactory.all_users(function (usersFromServer) {
      _this.users = usersFromServer;
      console.log("recieved all the users");
    });
  };

  // -------------------------------------------------------------------------
  //                            Login
  // -------------------------------------------------------------------------
  var login = function () {
    var name = prompt('Please Enter your Name to Book an Appointment');
    name = name.toLowerCase();
    console.log(name);
    user = {name: name};
    userFactory.createUser(user, function (userAfterServer) {
      console.log(userAfterServer);
      _this.currentuser = userAfterServer;
      all_users();
      $location.url('/');
    });
  };

  // -------------------------------------------------------------------------
  //                            Checking if user Exist
  // -------------------------------------------------------------------------
  var checkUser = function () {
    console.log("Checking User if logged if");
    userFactory.checkUser(function (returnedData) {
      console.log(returnedData);
      if (returnedData === false) {
        login();
      } else {
        _this.currentuser = returnedData;
        console.log(_this.currentuser);
        all_users();
      }
    });
  };
  checkUser();

  // -------------------------------------------------------------------------
  //                            Cancel Appointment
  // -------------------------------------------------------------------------
  _this.cancelApt = function () {
    userFactory.cancelApt(_this.currentuser._id, function (returnedData) {
      console.log(returnedData);
      all_users();
      checkUser();
      $location.url('/');
    });
  };

  // -------------------------------------------------------------------------
  //                           Logout
  // -------------------------------------------------------------------------
  _this.logout = function () {
    userFactory.logout(function (message) {
      console.log(message);
      login();
    });

  };

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
