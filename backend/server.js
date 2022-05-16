require('dotenv').config()
const express = require('express');

const _connect_database = require('./config/db');

const user = require('./routes/userRoute');

const app = express();


app.use(express.json());
_connect_database();



app.use('/api/v1', user);






app.listen(process.env.PORT || 3000, () => { console.log(`Server is running on port ${process.env.PORT || 3000}`) });