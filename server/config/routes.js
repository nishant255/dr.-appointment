console.log("Loading routes.js");
var path         = require('path'),
    userController = require('./../controllers/userController.js');
    appointmentController = require('./../controllers/appointmentController.js');

module.exports = function (app) {

  app.get('/users', userController.all_users);
  app.post('/user', userController.createUser);
  app.post('/newAppointment', appointmentController.createAppointment);
  app.delete('/del_apt/:id', appointmentController.deleteAppointment);
};
