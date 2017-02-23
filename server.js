console.log("Loading server.js");

var express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = 8000, // Adjust Required Port Number
    project  = "PROJECT_NAME", // Change Project Name
    app      = express();

app.use(express.static('client'));
app.use(express.static('bower_components'));
app.use(bp.json());

require(path.join(root, './server/config/mongoose.js'));
require(path.join(root, './server/config/routes.js'))(app);

app.listen(port, function(){
  console.log(`listening for ${ project } on port ${ port }`);
});
