const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    const connectionString = process.env.MONGODB_URI.replace(
      "<PASSWORD>",
      process.env.MONGODB_PASSWORD
    );
    await mongoose.connect(connectionString, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB connection successful.");
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
