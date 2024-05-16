const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductShema = new Schema({
  Prod_name: {
    type: "string",
    required: true,
  },
  sell_price: {
    type: "Number",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  Prod_images: {
    type: "Array",
    required: true,
  },
  Quantity: {
    type: "Number",
    required: true,
  },
  brand_img: {
    type: "string",
    required: true,
  },
  category: {
    type: "string",
    required: true,
  },
  rating: {
    type: "Array",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  details: {
    type: "Array",
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductShema);
