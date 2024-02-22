// /api/index.js
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
  if (req.method === 'POST') {
    let newUser = new User({
      name: req.body.name,
      attendance: req.body.attendance,
      message: req.body.message
    });

    await newUser.save();
    res.redirect("/");
  }
};