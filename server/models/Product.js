const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    department: String,
    category: String,
    index: Number,
    location: String,
    floor:String,
    condition: String,
    Repairdate: Date,


  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", ProductSchema);
