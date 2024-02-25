import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import "./Rsvp.css";

Modal.setAppElement("#root");

function Rsvp() {
  const [guestList, setGuestList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startCountdown = () => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setCountdown(3);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalIsOpen(true);

    fetch("https://server-rsvpoj.vercel.app/api/addRsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setGuestList([...guestList, data]);
        setFormData({ name: "", attendance: "", message: "" });

        startCountdown();

        setTimeout(() => {
          setModalIsOpen(false);
          fetchGuestList();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setModalIsOpen(false);
      });
  };

  const fetchGuestList = () => {
    fetch("https://server-rsvpoj.vercel.app/guestlist")
      .then((response) => response.json())
      .then((data) => setGuestList(data))
      .catch((error) => console.error("Error fetching guest list:", error));
  };

  useEffect(() => {
    fetchGuestList();
  }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            color: "lightsteelblue",
            width: "10%",
            height: "5%",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {countdown > 0 ? (
          <p>Modal will close in {countdown} seconds...</p>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
      <div className="form-container">
        <div className="form">
          <h1>RSVP Form</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="attendance">Attendance:</label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Attendance --</option>
              <option value="datang">Datang</option>
              <option value="tidak datang">Tidak Datang</option>
            </select>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
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
                  <strong></strong> {user.message}
                </p>
                <p className="nama">
                  <strong>Name:</strong> {user.name}
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