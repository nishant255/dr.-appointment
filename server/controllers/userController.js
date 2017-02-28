console.log("Loading Serverside userController.js");

var mongoose = require('mongoose'),
    User = mongoose.model('User');

function UserController() {

  var _this = this;
  var error_messages = [];

  // -------------------------------------------------------------------------
  //                      Create or Return Existing User
  // -------------------------------------------------------------------------
  _this.createUser = function (req, res) {
    console.log("Creating User");
    console.log(req.body.name);
    if (!req.body.name) {
      res.json({error: ["Name is required"]});
    }
    User.findOne({name: req.body.name}, function (err, user) {
      if (err) {
        console.log("Error while Finding User");
        console.log(err);
      } else {
        if (!user) {
          console.log("User Not Found! Creating New User");
          console.log(req.body);
          req.body.score = 0;
          req.body.percentage = 0;
          User.create(req.body, function (err, user) {
            if (err) {
              console.log("Error while Creating User");
              console.log(err);
            } else {
              console.log("User Created");
              res.json(user);
            }
          });
        } else {
          console.log("User Found");
          res.json(user);
        }
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Get all the users
  // -------------------------------------------------------------------------
  _this.all_users = function (req, res) {
    User.find({}).populate('_appointment').exec(function (err, users) {
      if (err) {
        console.log("Error While finding all the users");
        console.log(err);
      } else {
        res.json(users);
      }
    });
  };



}

module.exports = new UserController();
