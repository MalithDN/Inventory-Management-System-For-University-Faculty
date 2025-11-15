const express = require("express");
const User = require("../../models/User");
const logger = require("../../logger");
const fs = require('fs');
const path = require('path');
const router = express.Router();

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

// Route to fetch all users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// Route to fetch user details by ID
router.get("/details/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Error fetching user details", error: err.message });
  }
});

// Route to update user role
router.put("/updateRole/:id", async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  try {
    // Fetch the existing user first to compare roles
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If the role is the same as before, no need to update
    if (existingUser.role === role) {
      return res.status(200).json({
        success: true,
        message: "No changes made. The role remains the same.",
        data: existingUser,
      });
    }

    // Prepare the log for role change
    const oldRole = existingUser.role;
    const newRole = role;

    // Update the role
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    // Get the last logged-in email (the person performing the action)
    const performerEmail = getLastLoggedInEmail();

    // Log the role update with the email of the user being updated and the performer
    logger.info(
      `Role Updated - User Email: ${updatedUser.email}, Old Role: ${oldRole}, New Role: ${newRole}. Action performed by: ${performerEmail}`
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user role:", err);
    res.status(500).json({
      success: false,
      message: "Error updating user role",
      error: err.message,
    });
  }
});

// Route to delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the last logged-in email
    const performerEmail = getLastLoggedInEmail();

    // Log the deletion action with the user email and the performer
    logger.info(
      `User Deleted - User Email: ${result.email}. Action performed by: ${performerEmail}`
    );

    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
