const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://omozousha12:Ziggyss12@ojdatabase.mc8xxun.mongodb.net/TAMU-RSVP")
  .then(() => {
    console.log("Koneksi sukses");
  })
  .catch((err) => console.log("Tidak dapat terhubung ke database"));

const userSchema = new mongoose.Schema({
  name: String,
  attendance: String,
  message: String,
  eventDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/api/addRsvp", async function (req, res) {
  try {
    let newRsvp = new User({
      name: req.body.name,
      attendance: req.body.attendance,
      message: req.body.message,
    });

    await newRsvp.save();

    res.status(201).json({
      name: newRsvp.name,
      attendance: newRsvp.attendance,
      message: newRsvp.message,
    });
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send("An error occurred while adding RSVP");
  }
});

app.get("/guestlist", async function (req, res) {
  try {
    const users = await User.find({}).sort({ eventDate: -1 });
    res.send(users);
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send("An error occurred while retrieving users");
  }
});

// Endpoint untuk menghapus RSVP berdasarkan nama
app.delete("/api/deleteRsvp/:name", async function (req, res) {
  try {
    const deletedUser = await User.findOneAndDelete({ name: req.params.name });

    if (!deletedUser) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({
      message: "Data successfully deleted",
      deletedUser,
    });
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send("An error occurred while deleting RSVP");
  }
});

// Endpoint untuk menghapus semua data RSVP
app.delete("/api/deleteAllRsvp", async function (req, res) {
  try {
    const deletedUsers = await User.deleteMany();

    res.json({
      message: "All data successfully deleted",
      deletedUsers,
    });
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send("An error occurred while deleting all RSVPs");
  }
});

app.listen(5000, function () {
  console.log("Server berjalan di port 5000");
});