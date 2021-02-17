require('dotenv').config();
const express = require('express');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/userPage');
const pagesRoute = require('./routes/pages');


const mongoose = require('mongoose');


mongoose.connect(process.env.DB_CONNECTION_STRING,{ useUnifiedTopology: true }, ()=>{
    console.log("Connected to db")
});

app.use(express.json());

app.use('/api', authRoute);
app.use('/api/userpage', postRoute);
app.use('/api/pages', pagesRoute);


app.listen(3000, () => console.log("Server running"));

