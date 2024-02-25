import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rsvpmaster.css";

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

  const handleDelete = async (name) => {
    try {
      await axios.delete(`https://server-rsvpoj.vercel.app/api/deleteRsvp/${name}`);

      // Ambil ulang daftar tamu setelah RSVP dihapus
      fetchGuestList();
    } catch (error) {
      console.error("Error deleting RSVP:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("https://server-rsvpoj.vercel.app/api/deleteAllRsvp");

      // Ambil ulang daftar tamu setelah semua RSVP dihapus
      fetchGuestList();
    } catch (error) {
      console.error("Error deleting all RSVPs:", error);
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

  useEffect(() => {
    // Ambil daftar tamu saat komponen dimuat
    fetchGuestList();
  }, []);

  return (
    <div>
      <h2>RSVP Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Attendance:</label>
        <select value={attendance} onChange={(e) => setAttendance(e.target.value)} required>
          <option value="">Select</option>
          <option value="Attending">Attending</option>
          <option value="Not Attending">Not Attending</option>
        </select>

        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

        <button onClick={handleSubmit}>Submit RSVP</button>
      </form>

      <h2>Guest List</h2>
      <ul>
        {guestList.map((guest) => (
          <li key={guest._id}>
            {guest.name} - {guest.attendance}
            <button onClick={() => handleDelete(guest.name)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleDeleteAll}>Delete All RSVPs</button>
    </div>
  );
};

export default Rsvpmaster;