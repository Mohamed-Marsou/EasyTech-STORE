const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subSchema = new Schema({
  email: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Subs", subSchema);
