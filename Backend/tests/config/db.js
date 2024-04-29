const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: 'tests/config/config.env' });

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
