/* eslint-disable no-console */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const cors = require("cors");

const routes = require("./routes/routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const requestRateLimit = require("./middlewares/requestRateLimit");

const {
  PORT = 3000,
  DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb",
  CORS_URL = "http://localhost:3000",
} = process.env;
console.log("PORT:", PORT, "DB_URL:", DB_URL, "CORS_URL", CORS_URL);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to BD");
  })
  .catch((err) => {
    console.log("Fail connected to BD");
    console.log(err.message);
  });

const app = express();

app.use(requestRateLimit);

app.use(
  cors({
    origin: CORS_URL,
    credentials: true,
  })
);

app.use(
  session({
    name: "__session",

    store: new RedisStore({ client: redisClient }),

    secret: env.Secret,

    resave: false,

    saveUninitialized: false,

    proxy: true,

    cookie: {
      sameSite: "none",

      secure: true,

      httpOnly: true,

      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
