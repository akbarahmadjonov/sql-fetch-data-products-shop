require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const fileupload = require("express-fileupload");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const PORT = 5000;

const app = express();

app.use(fileupload());
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorHandler);

const path = require("path");
app.use(express.static(path.join(__dirname, "static")));

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
