const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://omozousha12:Ziggyss12@ojdatabase.mc8xxun.mongodb.net/TAMU-RSVP', { useNewUrlParser: true, useUnifiedTopology: true });

const rsvpSchema = new mongoose.Schema({
    name: String,
    email: String,
    attend: String
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

app.post('/api/addRsvp', (req, res) => {
    const newRSVP = new RSVP({
        name: req.body.name,
        email: req.body.email,
        attend: req.body.attend
    });

    newRSVP.save((err) => {
        if (err) {
            res.status(500).send('Failed to save RSVP');
        } else {
            res.status(200).send('RSVP saved successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});