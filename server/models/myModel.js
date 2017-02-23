console.log("Loading myModel.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var MySchema = new mongoose.Schema({
  MyField: { type: String, required: true, minlength: 2}
}, {timestamps: true});

mongoose.model('MyModel', MySchema);
