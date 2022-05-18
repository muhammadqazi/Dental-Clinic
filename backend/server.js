require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
var session = require('express-session')
const passport = require('passport');

const _connect_database = require('./config/db');

const user = require('./routes/userRoute');
const doc = require('./routes/doctorRoutes')
const spec = require('./routes/treatmentRoutes')

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'anything', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

_connect_database();



app.use('/api/v1', user);
app.use('/api/v1/', doc);
app.use('/api/v1/', spec);







app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${process.env.PORT || 3000}`) });