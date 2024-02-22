const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors module
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Use the cors middleware

// Koneksi ke MongoDB
mongoose
  .connect("process.env.MONGODB_URI")
  .then(() => {
    console.log("Koneksi sukses");
  })
  .catch((err) => console.log("Tidak dapat terhubung ke database"));

// Membuat skema
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

app.get("/", function (req, res) {
  res.sendFile(__dirname + "..client/src/App.js");
});

app.post("/", function (req, res) {
  let newUser = new User({
    name: req.body.name,
    attendance: req.body.attendance,
    message: req.body.message
  });

  newUser.save();
  res.redirect("/");
});

// Endpoint untuk menampilkan data dari database
app.get("/guestlist", async function (req, res) {

  try {

    // Urutkan berdasarkan tanggal eventDate secara descending
    const users = await User.find({}).sort({eventDate: -1}); 

    res.send(users);

  } catch (err) {

    console.log("Error occurred:", err);

    res.status(500).send("An error occurred while retrieving users");
  
  }

});


app.listen(5000, function () {
  console.log("Server berjalan di port 5000");
});