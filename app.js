const express = require('express');
const app = express();
const ConnectDb = require('./config/db');
const contactRoutes = require('./routes/ContactRoutes')
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');


ConnectDb();
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/contact',contactRoutes);
app.use('/users',userRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));