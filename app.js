const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cartCount = require("./middleware/CartCount");
const cartCush = require("./middleware/CushCount");
//- Router
const clientRouter = require("./router/client");
const adminRouter = require("./router/admin");

const app = express();
//- session
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessionsStr",
});
app.use(
  session({
    secret: "My secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// * TAMPLTING ENGINE EJS
app.set("view engine", "ejs");
app.set("views", "views");
// -
app.use(bodyParser.urlencoded({ extended: false }));
// *serving static files
app.use(express.static(path.join(__dirname, "public")));

app.use(cartCush);
app.use(cartCount);
app.use(clientRouter);
app.use(adminRouter);

// Connecting with Mongoose
mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    app.listen(process.env.DEVE_PORT, () => {
      console.log("Node server listening on port " + process.env.DEVE_PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect " + err);
  });
