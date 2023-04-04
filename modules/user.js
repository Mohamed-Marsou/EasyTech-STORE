const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  user_name: {
    type: "string",
    required: true,
  },
  user_email: {
    type: "string",
    required: true,
  },
  user_password: {
    type: "string",
    required: true,
  },
  gender: {
    type: "string",
    required: true,
  },
  address: String,
  city: String,
  Phone_number: String,
  Zip: Number,
  purchases: Array,
  favourites: Array,
  Cart: Array,
});

module.exports = mongoose.model("Users", userSchema);
