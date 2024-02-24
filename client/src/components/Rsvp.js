import React, { useState, useEffect } from 'react';
import './Rsvp.css';

function Rsvp() {
    const [guestList, setGuestList] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        attendance: '',
        message: '',
    });

    useEffect(() => {
        // Fetch data from the /guestlist endpoint
        fetch('https://server-rsvpoj.vercel.app/guestlist')
            .then(response => response.json())
            .then(data => setGuestList(data))
            .catch(error => console.error('Error fetching guest list:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send data to the server
        fetch('https://server-rsvpoj.vercel.app/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            // Update the guest list with the new data
            setGuestList([...guestList, data]);
        })
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div>
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
                    {guestList.map(user => (
                        <div key={user.name} className="chatBalloon">
                            <p className='pesan'><strong></strong> {user.message}</p>
                            <p className='nama'><strong>Name:</strong> {user.name}</p>
                            <p className='tanggal'><strong>Date:</strong> {new Date(user.eventDate).toLocaleDateString()}</p>
                        </div>
                    )).sort((a,b) => new Date(b.eventDate) - new Date(a.eventDate))}
                </div>
            </div>
        </div>
    );
}

export default Rsvp;
