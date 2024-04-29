const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectDB = async () => {
  try {
    const conenct = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connected: ${conenct.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
