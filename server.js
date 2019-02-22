
// DEPENDENCIES

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var htmlRoutes = require('./app/routing/htmlRoutes.js');
var ApiRoutes = require('./app/routing/apiRoutes.js’);
var friends = require('./app/data/friends.js');


// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server 

var app = express(); 
var PORT = process.env.PORT || 3000; 

//BodyParser makes it easy for our server to interpret data sent to it./
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// ROUTER
// The below points our server to a series of "route" files.

var api = new ApiRoutes();

require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

api.getApi(app, friends);
api.postAPI(app, friends);

// LISTENER
// The below code effectively "starts" our server 

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
