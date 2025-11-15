const express = require("express");
const {
  getFilteredProducts,   // The controller to get filtered products
  getProductDetails,     // The controller to get product details (if needed)
} = require("../../controllers/shop/products-controller");

const router = express.Router();

// Route to get filtered products with device and sort query parameters
router.get("/get", getFilteredProducts);

// Route to get product details by product ID
router.get("/get/:id", getProductDetails);

module.exports = router;
