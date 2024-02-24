import React, { useState } from "react";

const Rsvp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attend: "yes",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/addRsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        alert("RSVP submitted successfully!");
      } else {
        alert("Failed to submit RSVP. Please try again.");
      }
    });
  };

  return (
    <div>
      <h1>RSVP Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />

        <label htmlFor="attend">Will you attend?</label>
        <select
          id="attend"
          name="attend"
          value={formData.attend}
          onChange={handleInputChange}
          required
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <br />
        <br />

        <button type="submit">Submit RSVP</button>
      </form>
    </div>
  );
};

export default Rsvp;
