const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk mengurai body dalam format JSON
app.use(cors());

// Koneksi ke MongoDB
mongoose
  .connect("mongodb+srv://omozousha12:Ziggyss12@ojdatabase.mc8xxun.mongodb.net/TAMU-RSVP")
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
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

let clients = [];

// Endpoint for client connections
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  clients.push(res);

  req.on('close', () => {
    clients = clients.filter(client => client !== res);
  });
});

// Endpoint untuk menambahkan RSVP ke database
app.post("/api/addRsvp", async function (req, res) {
  try {
    let newRsvp = new User({
      name: req.body.name,
      attendance: req.body.attendance,
      message: req.body.message,
    });

    await newRsvp.save();

    // Notify all clients about the new guest
    clients.forEach(client =>
      client.write(`data: ${JSON.stringify(newRsvp)}\n\n`)
    );

    // Kirim respons dalam format JSON yang valid
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

// Endpoint untuk menampilkan data dari database
app.get("/guestlist", async function (req, res) {
  try {
    const users = await User.find({}).sort({ eventDate: -1 });
    res.send(users);
  } catch (err) {
    console.log("Error occurred:", err);
    res.status(500).send("An error occurred while retrieving users");
  }
});

app.listen(5000, function () {
  console.log("Server berjalan di port 5000");
});