console.log("Loading userFactory.js");

app.factory('userFactory', ['$http', function ($http) {

  var user = {};

  function UserFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Create User
    // -------------------------------------------------------------------------
    _this.createUser = function (newUser, callback) {
      $http.post('/user', newUser).then(function (dataFromServer) {
        console.log("User from Server");
        console.log(dataFromServer);
        user = dataFromServer.data;
        if (typeof(callback) == 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get All the Users
    // -------------------------------------------------------------------------
    _this.all_users = function (callback) {
      console.log("Required all the users");
      $http.get('/users').then(function (usersFromServer) {
        if (typeof(callback) == 'function') {
          console.log("in the Factory");
          callback(usersFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            createAppointment
    // -------------------------------------------------------------------------
    _this.createAppointment = function (newAppointment, callback) {
      console.log("Sending Appointment from User Factory");
      newAppointment.userid = user._id;
      console.log(newAppointment.userid);
      $http.post('/newAppointment', newAppointment).then(function (dataFromServer) {
        if (typeof(callback) == 'function') {
          console.log("in the Factory");
          callback(dataFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                      Check Logged in User
    // -------------------------------------------------------------------------
    _this.checkUser = function (callback) {
      console.log("Checking for user in factory");
      console.log(user);
      if (!user.name) {
        callback(false);
      } else {
        callback(user);
      }
    };

    // -------------------------------------------------------------------------
    //                      cancelApt
    // -------------------------------------------------------------------------
    _this.cancelApt = function (userid, callback) {
      $http.delete('/del_apt/' + userid, function (returnedData) {
        console.log(returnedData);
      })
    }

    // -------------------------------------------------------------------------
    //                      Logout
    // -------------------------------------------------------------------------
    _this.logout = function (callback) {
      user = {};
      if (typeof(callback) == 'function') {
        callback("Successfully Logged Out");
      }
    };


  }
  return new UserFactory();
}]);
