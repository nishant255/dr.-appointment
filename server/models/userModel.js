console.log("Loading userModel.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  _appointment: {type: Schema.Types.ObjectId, ref: 'Appointment'},  
}, {timestamps: true});

mongoose.model('User', UserSchema);
