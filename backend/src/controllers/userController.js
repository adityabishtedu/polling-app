const User = require("../models/User"); // Assuming you have a User model
const runMigrations = require("../config/runMigrations");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create the user
    const newUser = await User.create({
      username,
      email,
      password, // Make sure to hash the password before saving
    });

    // Run specific user-related migration
    await runMigrations("YYYYMMDDHHMMSS-add-user-related-field.js");

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// Other user-related controller functions...
