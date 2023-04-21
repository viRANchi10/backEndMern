require("dotenv").config();

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("./db/Conn");
const router = require("./routes/router");
const cors = require("cors");
const port = 7000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(cookieParser());

app.listen(port, () => {
  console.log(`connection start on port ${port}`);
});
