const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const allowedOrigins = ['https://64d6ae1e0c870d1dd5251e01--merry-cascaron-f293ee.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

require("./db/conn");

app.use(express.json());
app.use(require("./router/auth")); //routers



app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
