import React, { useState, useEffect } from "react";
import "./Rsvp.css";

function Rsvp() {
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    // Fetch data from the /guestlist endpoint
    fetch("https://server-rsvpoj.vercel.app/api/guestlist")
      .then((response) => response.json())
      .then((data) => setGuestList(data))
      .catch((error) => console.error("Error fetching guest list:", error));
  }, []);

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = () => {
    // Submit form data to API
    fetch("https://server-rsvpoj.vercel.app/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        attendance,
        message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully!");
          setName("");
          setAttendance("");
          setMessage("");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Failed to submit form");
      });
  };

  return (
    <div>
      <div className="form-container">
        <div className="form">
          <h1>RSVP Form</h1>
          <form onSubmit={submitForm}>
            <label htmlFor="name">Name:</label>
            <input
              placeholder="Your Name"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />

            <label htmlFor="attendance">Attendance:</label>
            <select
              id="attendance"
              name="attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="select"
              required
            >
              <option value="">-- Select Attendance --</option>
              <option value="datang">Datang</option>
              <option value="tidak datang">Tidak Datang</option>
            </select>

            <label htmlFor="message">Message:</label>
            <textarea
              placeholder="Say hello"
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="textarea"
              required
            />

            <div className="button-container">
              <button type="submit" className="send-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <h2>Guest Response:</h2>
        <div id="guestList" className="chatContainer">
          {guestList
            .map((user) => (
              <div key={user.name} className="chatBalloon">
                <p className="pesan">
                  <strong>{user.name}:</strong> {user.message}
                </p>
                <p className="tanggal">
                  <strong>Date:</strong>{" "}
                  {new Date(user.eventDate).toLocaleDateString()}
                </p>
              </div>
            ))
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))}
        </div>
      </div>
    </div>
  );
}

export default Rsvp;
