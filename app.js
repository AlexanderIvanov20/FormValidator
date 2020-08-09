const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const cors = require("cors");
const compression = require("compression");
const hbs = require("hbs");
const session = require("express-session");
const helmet = require("helmet");

const indexRouter = require("./routes/index");
const formRouter = require("./routes/form");
const loginRouter = require("./routes/login");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(compression());
app.disable("x-powered-by");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cookieSession({
    name: "session",
    keys: ["asdfdsaw1", "asdfsaw2"],
  })
);

app.use(cors());
app.use(helmet());

app.use("/", indexRouter);
app.use("/form", formRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

var server = app.listen(process.env.PORT || 8000, () => {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

module.exports = app;
