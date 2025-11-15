const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    // Destructure the query parameters
    const { device = [], category = [], department = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    // Apply filter for 'device' if provided
    if (device.length) {
      filters.device = { $in: device.split(",") };  // Split the device string into an array and filter
    }

    // Apply filter for 'category' if provided
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Apply filter for 'brand' if provided
    if (department.length) {
      filters.department = { $in: department.split(",") };
    }

    let sort = {};

    // Apply sorting based on the 'sortBy' parameter
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1; // Default sort by price ascending
        break;
    }

    // Fetch products from the database with the applied filters and sorting
    const products = await Product.find(filters).sort(sort);

    // Send the filtered products as the response
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    // Correct error handling
    console.error(e); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.error(e); // Log the actual error
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };
