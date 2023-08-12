const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://toolbox-mern.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

require("./db/conn");

app.use(express.json());
app.use(require("./router/auth")); //routers



app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
