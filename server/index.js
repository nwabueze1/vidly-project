const express = require("express");
const { json, urlencoded, static } = require("express");

const helmet = require("helmet");
const morgan = require("morgan");
const some = require("./authenticate");
const router = require("./routes/courses");
const app = express();
const route = require("./routes/home");
const config = require("config");
const startupDebug = require("debug")("app:startup");
app.set("view engine", "pug");
app.set("views", "./views");

app.use(json());
app.use(static("public"));
app.use(urlencoded({ extended: true }));
app.use(some);
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebug("Morgan enabled");
}
app.use("/", route);
app.use("api/courses", router);
console.log("app name: " + config.get("name"));
console.log("mail: " + config.get("mail.host"));
console.log("mail password" + config.get("mail.password"));

const port = 3500 || process.env.PORT;
app.listen({ port }, () => {
  console.log(`listening on port ${port}`);
});
