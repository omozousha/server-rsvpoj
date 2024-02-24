import React, { useState, useEffect } from "react";
import "./Rsvp.css";

function Rsvp() {
  const [guestList, setGuestList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
      })
      .catch((error) => console.error("Error submitting form:", error));

    // Refresh guest list after submission
    fetchGuestList();
  };

  // Fetch data from the /guestlist endpoint
  const fetchGuestList = () => {
    fetch("https://server-rsvpoj.vercel.app/guestlist")
      .then((response) => response.json())
      .then((data) => setGuestList(data))
      .catch((error) => console.error("Error fetching guest list:", error));
  };

  useEffect(() => {
    fetchGuestList();
  }, []);

  return <div>// Rest of component</div>;
}

export default Rsvp;
