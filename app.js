const express = require('express');
const app = express();
const ConnectDb = require('./config/db');
const contactRoutes = require('./routes/ContactRoutes')

require('dotenv').config();

ConnectDb();
app.use(express.json());

app.use('/contact',contactRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));