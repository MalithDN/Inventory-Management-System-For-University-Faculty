const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    department: String,
    device: String,
    did: Number,
    halltype: String,
    hallid:String,
    condition: String,
    Repairdate: Date,


  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", ProductSchema);
