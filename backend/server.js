require('dotenv').config()
const express = require('express');
const bodyParser = require("body-parser");
var session = require('express-session')
const passport = require('passport');

const user = require('./routes/userRoute');
const doc = require('./routes/doctorRoutes')
const spec = require('./routes/treatmentRoutes')
const client = require('./routes/clientRoutes')
const appointment = require('./routes/appointmentRoutes')
const bill = require('./routes/billRoutes')
const payment = require('./routes/paymentRoutes')
const tel = require('./routes/telephoneRoutes')
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'anything', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', user);
app.use('/api/v1/', doc);
app.use('/api/v1/', spec);
app.use('/api/v1/', client);
app.use('/api/v1/', appointment);
app.use('/api/v1/', bill);
app.use('/api/v1/', payment);
app.use('/api/v1/', tel);



app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${process.env.PORT || 3000}`) });