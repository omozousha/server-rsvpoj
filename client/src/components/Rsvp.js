// Rsvp.js

import { useState } from 'react';

function Rsvp() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      attendance,
      message 
    };

    const response = await fetch('https://server-rsvpoj.vercel.app/guestlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log('RSVP submitted!');
      // clear form 
      setName('');
      setAttendance('');
      setMessage('');
    } else {
      console.error('Error submitting RSVP');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)} 
      />

      <select
        value={attendance}
        onChange={(e) => setAttendance(e.target.value)}
      >
        <option value="coming">Coming</option>
        <option value="not_coming">Not Coming</option>
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Submit RSVP</button>
    </form>
  );
}

export default Rsvp;
