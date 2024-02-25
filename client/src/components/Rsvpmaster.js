import React, { useState, useEffect } from "react";
import "./Rsvpmaster.css";
import axios from "axios";

const Rsvpmaster = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [guestList, setGuestList] = useState([]);

  const handleSubmit = async () => {
    try {
      await axios.post("https://server-rsvpoj.vercel.app/api/addRsvp", {
        name,
        attendance,
        message,
      });

      // Ambil ulang daftar tamu setelah RSVP ditambahkan
      fetchGuestList();
    } catch (error) {
      console.error("Error adding RSVP:", error);
    }
  };

  const fetchGuestList = async () => {
    try {
      const response = await axios.get("https://server-rsvpoj.vercel.app/guestlist");
      setGuestList(response.data);
    } catch (error) {
      console.error("Error fetching guest list:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "attendance":
        setAttendance(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Ambil daftar tamu saat komponen dimuat
    fetchGuestList();
  }, []);

  return (
    <div className="form-container">
      <div className="form">
      <h2>RSVP Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleChange} required placeholder="Enter your name" />

        <label>Attendance:</label>
        <select name="attendance" value={attendance} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Attending">Attending</option>
          <option value="Not Attending">Not Attending</option>
        </select>

        <label>Message:</label>
        <textarea name="message" value={message} onChange={handleChange} placeholder="Enter your message"></textarea>

        <div className="button-container">
        <button onClick={handleSubmit} className="send-button">Submit RSVP</button>
        </div>
      </form>

      <h2>Guest List</h2>
      <div id="guestList" className="chatContainer">
        {guestList.map((guest) => (
          <div key={guest._id} className="chatBalloon">
            <p className="pesan">
              <strong></strong>"{guest.message}"</p>
            <p className="nama">
              <strong>Name:</strong> {guest.name}</p>
            <p className="kehadiran">
              <strong>Attendance:</strong> {guest.attendance}</p>
            <p className="tanggal">
              {new Date(guest.eventDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Rsvpmaster;