const express = require("express");
const User = require("../../models/User"); // Assuming you have a User model
const router = express.Router();

// Route to fetch all users
router.get("/get", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (err) {
    console.error("Error fetching users:", err);  // Log error for debugging
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
    console.error("Error fetching user details:", err);  // Log error for debugging
    res.status(500).json({ message: "Error fetching user details", error: err.message });
  }
});

// Route to update user role
router.put("/updateRole/:id", async (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: "Role is required" });  // Handle missing role
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (err) {
    console.error("Error updating user role:", err);  // Log error for debugging
    res.status(500).json({ message: "Error updating user role", error: err.message });
  }
});

// Route to delete user
router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);  // Log error for debugging
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
