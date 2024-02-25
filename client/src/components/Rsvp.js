import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Rsvp.css";

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

function Rsvp() {
  const [guestList, setGuestList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false); // New state for modal

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalIsOpen(true); // Open modal

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
        setFormData({ name: "", attendance: "", message: "" }); // Reset form after submission
        setTimeout(() => {
          setModalIsOpen(false); // Close modal after 3 seconds
          fetchGuestList(); // Refresh the guest list data
        }, 3000);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setModalIsOpen(false); // Close modal if there's an error
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
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
    animation: 'slideDown 0.5s ease-out' 
  }}
>
  Loading...
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