const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const user = require("./routes/use-routes.js")
const dietRoute = require("./routes/diet-routes.js")
const requestRoute = require("./routes/request-routes.js")
const verifyLogin =require("./routes/verifyLogin.js")

const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('thisissomesecret'));

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client', 'dist')));
app.use('/static', express.static(path.join(__dirname, '../client', 'dist', 'assets')));
app.use('/diet', dietRoute);
app.use('/users', user);
app.use('/request',requestRoute);

app.post('/login', verifyLogin)


module.exports = app;
