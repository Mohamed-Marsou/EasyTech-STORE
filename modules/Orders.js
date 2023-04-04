const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  user_name: {
    type: "string",
    required: true,
  },
  user_email: {
    type: "string",
    required: true,
  },
  address: {
    type: "string",
    required: true,
  },
  city: {
    type: "string",
    required: true,
  },
  Phone_number: {
    type: "string",
    required: true,
  },
  purchases: {
    type: "array",
    required: true,
  },
  user_lastName: "string",
  Zip: Number,
  Notes: "string",
});

module.exports = mongoose.model("Orders", OrderSchema);
