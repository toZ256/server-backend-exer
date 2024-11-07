const mongoose = require("mongoose");

// Fungsi untuk menyambungkan ke mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://to_z:<psswrd>@cluster0.9cqvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
