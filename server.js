/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const express = require("express");
require('dotenv').config()

const app = express();
const PORT = 80;

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', PORT);


app.get('/healthcheck', (req, res) => {
  res.send("I'm Healthy")
});

app.listen(PORT, () => {
  console.log("Server is Running on port " + PORT);
});
