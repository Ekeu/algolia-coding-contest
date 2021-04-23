const express = require('express');
const fs = require('fs');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
//Route middlewares
fs.readdirSync('./server/routes').map((route) =>
  app.use('/api/v1', require(`./routes/${route}`))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
