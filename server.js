const app = require("./app.js");
const connectDB = require("./config/db.js");
const PORT = 4000;

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
