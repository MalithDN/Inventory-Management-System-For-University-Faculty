const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// Import the logger function
const logger = require("../../logger");
const fs = require('fs');
const path = require('path');

// Helper function to get the last logged-in email
const getLastLoggedInEmail = () => {
  try {
    // Read the system log file
    const logFilePath = path.join(__dirname, '../../logs/system.log');
    const logFileData = fs.readFileSync(logFilePath, 'utf8');
    const logLines = logFileData.split('\n');
    
    // Search for the most recent login log entry
    for (let i = logLines.length - 1; i >= 0; i--) {
      const line = logLines[i];
      if (line.includes('logged in')) {
        const emailMatch = line.match(/email: (\S+)/); // Extract the email
        if (emailMatch) {
          return emailMatch[1]; // Return the first matched email
        }
      }
    }
  } catch (error) {
    console.error('Error reading log file:', error);
    return 'Unknown User'; // Return a default value if there's an error
  }
};

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      department,
      device,
      did,
      halltype,
      hallid,
      condition,
      Repairdate,
    } = req.body;


    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      department,
      device,
      did,
      halltype,
      hallid,
      condition,
      Repairdate,
    });

    await newlyCreatedProduct.save();
    
    // Get the last logged-in email
    const userEmail = getLastLoggedInEmail();

    // Log the item addition action with the email
    logger.info(`Item Added - Product Title: ${newlyCreatedProduct.title}, Product ID: ${newlyCreatedProduct._id}, Condition: ${newlyCreatedProduct.condition}, Department: ${newlyCreatedProduct.department}, Repair Date: ${newlyCreatedProduct.Repairdate}, Hall ID: ${newlyCreatedProduct.hallid}, User: ${userEmail}`);

    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      department,
      device,
      did,
      halltype,
      hallid,
      condition,
      Repairdate,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
      const oldData = {
        title: findProduct.title,
        description: findProduct.description,
        department: findProduct.department,
        device: findProduct.device,
        did: findProduct.did,
        halltype: findProduct.halltype,
        hallid: findProduct.hallid,
        condition: findProduct.condition,
        repairdate: findProduct.Repairdate,
      };
  
      // Format Repairdate (just date without time and timezone)
      const formattedOldRepairDate = oldData.repairdate
        ? new Date(oldData.repairdate).toLocaleDateString()
        : null;
      const formattedNewRepairDate = Repairdate
        ? new Date(Repairdate).toLocaleDateString()
        : null;
  
      // Update the fields that are being edited
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.device = device || findProduct.device;
    findProduct.department = department || findProduct.department;
    findProduct.did = did  || findProduct.did;
    findProduct.hallid = hallid  || findProduct.hallid;
    findProduct.halltype = halltype || findProduct.halltype;
    findProduct.image = image || findProduct.image;
    findProduct.condition = condition || findProduct.condition;
    findProduct.Repairdate = Repairdate || findProduct.Repairdate;

   // Save updated product
    await findProduct.save();

    // Get the last logged-in email
    const userEmail = getLastLoggedInEmail();

    // Prepare an array to store the changes in a single line
    const changes = [];

    // Check and log changes for each field
    if (oldData.title !== findProduct.title) {
      changes.push(`{Title: old = "${oldData.title}", new = "${findProduct.title}"}`);
    }
    if (oldData.description !== findProduct.description) {
      changes.push(`{Description: old = "${oldData.description}", new = "${findProduct.description}"}`);
    }
    if (oldData.device !== findProduct.device) {
      changes.push(`{Device: old = "${oldData.device}", new = "${findProduct.device}"}`);
    }
    if (oldData.did !== findProduct.did) {
      changes.push(`{ID: old = "${oldData.did}", new = "${findProduct.did}"}`);
    }
    if (oldData.department !== findProduct.department) {
      changes.push(`{Department: old = "${oldData.department}", new = "${findProduct.department}"}`);
    }
    if (oldData.halltype !== findProduct.halltype) {
      changes.push(`{Hall Type: old = "${oldData.halltype}", new = "${findProduct.halltype}"}`);
    }
    if (oldData.hallid !== findProduct.hallid) {
      changes.push(`{Hall ID: old = "${oldData.hallid}", new = "${findProduct.hallid}"}`);
    }
    if (oldData.condition !== findProduct.condition) {
      changes.push(`{Condition: old = "${oldData.condition}", new = "${findProduct.condition}"}`);
    }
    if (formattedOldRepairDate !== formattedNewRepairDate) {
      changes.push(`{Repair Date: old = "${formattedOldRepairDate}", new = "${formattedNewRepairDate}"}`);
    }

    // Log the changes in a single line in the desired format
    if (changes.length > 0) {
      logger.info(`Item Edited - Product ID: ${findProduct._id}, Changes Made: ${changes.join(", ")}, User: ${userEmail}`);
    } else {
      logger.info(`Item Edited - Product ID: ${findProduct._id}, No changes made, User: ${userEmail}`);
    }

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
// Get the last logged-in email
    const userEmail = getLastLoggedInEmail();

    // Log the item delete action with product title and email
    logger.info(`Item Deleted - Product Title: ${product.title}, Product ID: ${id}, User: ${userEmail}`);

    res.status(200).json({
      success: true,
      message: "Inventory delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
