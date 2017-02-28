console.log("Loading appointmentModel.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var AppointmentSchema = new mongoose.Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: String},
  time: {type: String},
  actual_date: {type: Date},
  complain: { type: String, minlength:10}
}, {timestamps: true});

mongoose.model('Appointment', AppointmentSchema);
