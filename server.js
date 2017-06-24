const path = require('path');
const express = require('express');
const app = express();

let port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
	console.log("The server is running on port " + port + "!");
});