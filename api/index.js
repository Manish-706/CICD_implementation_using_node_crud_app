const connectDB = require('../src/config/db');
const app = require('../src/app');

module.exports = async (req, res) => {
  if (req.url.startsWith('/api/items')) {
    try {
      await connectDB();
    } catch (err) {
      console.error('Database connection failed:', {
        message: err.message,
        name: err.name,
        hasMongoUri: Boolean(process.env.MONGODB_URI || process.env.MONGO_URI)
      });
      return res.status(500).json({ message: 'Database connection failed' });
    }
  }

  return app(req, res);
};
