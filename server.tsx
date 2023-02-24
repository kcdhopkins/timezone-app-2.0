const path = require('path');
const express = require("express");
require('dotenv').config()
const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', PORT);

app.listen(PORT, () => {
  console.log("Server Healthy")
  console.log("Server is Running on port " + PORT);
});
