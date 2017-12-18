// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

var http = require('http').Server(app);
var io = require('socket.io')(http);



// Sets up the Express app to handle data parsing
app.use(bodyParser.json());

//Keep an eye on this - may need to be set to 'false'
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));



// Routes
// =============================================================

require("./controllers/new_chat.js")(io);


// Syncing our sequelize models and then starting our Express app
// =============================================================
	http.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});