import React, { useState, useEffect } from 'react';

function Rsvp() {

  const [guestList, setGuestList] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    message: ''  
  });

  useEffect(() => {
    // Fetch guest list data
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('https://server-rsvpoj.vercel.app/api/guestlist', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      setFormData({
        name: '',
        attendance: '',
        message: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  return (
    <div>
      <div className="form-container">
        <div className="form">
          <h1>RSVP Form</h1>
          
          <form onChange={handleChange} onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input 
              required
              placeholder="Your Name"
              type="text" 
              id="name"
              name="name"
              value={formData.name}
            />

            <label htmlFor="attendance">Attendance:</label>
            <select
              required
              id="attendance"
              name="attendance"
              value={formData.attendance}  
            >
              <option value="">-- Select Attendance --</option>
              <option value="coming">Coming</option>
              <option value="not_coming">Not Coming</option>
            </select>

            <label htmlFor="message">Message:</label>
            <textarea
              required
              placeholder="Say hello"
              id="message"
              name="message"
              value={formData.message}
            />
            
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div>
                <h2>Guest Response:</h2>
                <div id="guestList" className="chatContainer">
                    {guestList.map(user => (
                        <div key={user.name} className="chatBalloon">
                            <p className='pesan'><strong></strong> {user.message}</p>
                            <p className='nama'><strong>Name:</strong> {user.name}</p>
                          {/*  <p className='kehadiran'><strong>Attendance:</strong> {user.attendance}</p> */}
                            <p className='tanggal'><strong>Date:</strong> {new Date(user.eventDate).toLocaleDateString()}</p>
                        </div>
                    )).sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))}
                </div>
            </div>
        </div>
    );
}

export default Rsvp;