// /api/guestlist.js
const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  cachedDb = mongoose.connection;
}

const userSchema = new mongoose.Schema({
  name: String,
  attendance: String,
  message: String,
  eventDate: {
    type: Date,
    default: Date.now
  }
});
const User = mongoose.model("User", userSchema);

module.exports = async (req, res) => {
  await connectToDatabase();
  if (req.method === 'GET') {
    try {
      const users = await User.find({}).sort({eventDate: -1});
      res.send(users);
    } catch (err) {
      console.log("Error occurred:", err);
      res.status(500).send("An error occurred while retrieving users");
    }
  }
};