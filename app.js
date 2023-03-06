const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

//- Router
const clientRouter = require("./router/client");
const adminRouter = require("./router/admin");

const app = express();

// * TAMPLTING ENGINE EJS
app.set("view engine", "ejs");
app.set("views", "views");
// -
app.use(bodyParser.urlencoded({ extended: false }));
// *serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use(clientRouter);
app.use(adminRouter);
app.listen(process.env.DEVE_PORT, () => {
  console.log("Node server listening on port " + process.env.DEVE_PORT);
});
