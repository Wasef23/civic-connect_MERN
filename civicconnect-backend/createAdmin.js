require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); 
const createAdmin = async () => {
  try {
    // Connect to MongoDB await mongoose.connect(process.env.MONGO_URI,); console.log("MongoDB Connected");
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@example.com",
      role: "admin",
    });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("yourSecurePassword", 10);

    // Create admin user
    const admin = new User({
      name: "Admin Name",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};
createAdmin();
