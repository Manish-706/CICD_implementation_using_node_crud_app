const connectDB = require('../src/config/db');
const app = require('../src/app');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error('Database connection failed:', err);
      return res.status(500).json({ message: 'Database connection failed' });
    }
  }

  return app(req, res);
};
