console.log("Loading Serverside userController.js");

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Appointment = mongoose.model('Appointment'),
    moment = require('moment');

function UserController() {

  var _this = this;
  var error_messages = [];


  // -------------------------------------------------------------------------
  //                           Create Appointment
  // -------------------------------------------------------------------------
  _this.createAppointment = function (req ,res) {
    error_messages = [];
    appointmentDate = new Date(Date.parse(req.body.date));
    currentDate = new Date();
    apttime = appointmentDate.getHours();
    console.log(apttime);
    dateCheck = moment(appointmentDate).isAfter(currentDate);
    if (dateCheck) {
      if (apttime > 8 && apttime < 17) {
        User.findOne({_id:req.body.userid}, function (err, user) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Successfully Assisgned Appointment with User");
          Appointment.find({_user: req.body.userid}, function (err, appointments) {
            if (err) {
              console.log(err);
              return;
            }
            console.log("Already Appointment Found!, Updating and Time");
            if(appointments.length >= 1){
              console.log("here in update");
              appointment = appointments[0];
              appointment.actual_date = appointmentDate;
              appointment.date = appointmentDate.toDateString();
              appointment.time = appointmentDate.toTimeString();
              appointment.complain = req.body.complain;
              appointment.save(function (err) {console.log(err);return;});
              res.json(appointment);
            } else {
              Appointment.find({date: appointmentDate.toDateString()}, function (err, appointments) {
                if (err) {
                  console.log(err);
                  return;
                }
                console.log(appointments.length);
                if (appointments.length > 2) {
                  error_messages.push("Too Many Appointment for the Day");
                  res.json({error_message: error_messages});
                } else {
                  Appointment.create({_user: req.body.userid, date: appointmentDate.toDateString(), time: appointmentDate.toTimeString(), actual_date: appointmentDate, complain: req.body.complain}, function (err, appointment) {
                    if (err) {
                      console.log("Error While Create Appointment");
                      error_messages.push(err);
                      console.log(err);
                      res.json({error_message: error_messages});
                    } else {
                      console.log("Successfully Created Appointment");
                      user._appointment = appointment._id;
                      user.save(function (err) {console.log(err);return;});
                      res.json(appointment);
                    }
                  });
                }
              });
            }
          });
        });
      } else {
        console.log("Too Late");
        error_messages.push("Too Late! Appointments are only between 8 AM to 5 PM;");
        res.json({error_message: error_messages});
      }
    }
    else {
      console.log("Appointments to be made only for Future Dates");
      error_messages.push("Appointments to be made only for Future Dates");
      res.json({error_message: error_messages});
    }
  };

  // -------------------------------------------------------------------------
  //                           Delete Appointment
  // -------------------------------------------------------------------------

  _this.deleteAppointment = function (req, res) {
    console.log(req.params.id);
    Appointment.findOne({_user: req.params.id}, function (err, appointment) {
      console.log(appointment);
      currentDate = new Date();
      deldate = moment(appointment.actual_date).subtract(1, 'days');
      console.log(deldate);
      currentDate = moment(currentDate).local();
      console.log(currentDate);
      check_del = moment(deldate).isSame(currentDate,'day');
      if (check_del) {
        Appointment.remove({_user: req.params.id}, function (err) {
          if (err) {
            console.log(err);
            res.json({err: err});
          }
          error_messages.push("Successfully Delete Appointment");
          res.json({error_message: error_messages});
        })
      } else {
        error_messages.push("You Can Delete Appointment only 1 day before");
        res.json({error_message: error_messages});
      }

    });
  };

}

module.exports = new UserController();
