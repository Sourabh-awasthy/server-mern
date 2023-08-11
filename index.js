const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose');

dotenv.config({ path: './config.env' })
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;
const corsOptions = {
  origin: [`${BASE_URL}`], 
  credentials: true, 
};

app.use(cors(corsOptions));
require("./db/conn");

app.use(express.json());
app.use(require("./router/auth")); //routers



app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
