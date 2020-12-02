const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("DB_PATH"),{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });
    console.log("Database connected ....");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
