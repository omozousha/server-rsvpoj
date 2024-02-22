// Countdown.js
import React, { useEffect, useState } from 'react';
import './Countdown.css';

const Countdown = () => {
  const [days, setDays] = useState('00');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  useEffect(() => {
    const targetDate = new Date('2024/02/06 00:00:00');

    const timeToLaunch = () => {
      const currentDate = new Date();
      let diff = Math.abs(Math.floor((currentDate - targetDate) / 1000));

      const daysCount = Math.floor(diff / (24 * 60 * 60));
      diff -= daysCount * 24 * 60 * 60;

      const hoursCount = Math.floor(diff / (60 * 60));
      diff -= hoursCount * 60 * 60;

      const minutesCount = Math.floor(diff / 60);
      diff -= minutesCount * 60;

      const secondsCount = diff;

      setDays(String(daysCount).padStart(2, '0'));
      setHours(String(hoursCount).padStart(2, '0'));
      setMinutes(String(minutesCount).padStart(2, '0'));
      setSeconds(String(secondsCount).padStart(2, '0'));
    };

    const countDownTimer = () => {
      timeToLaunch();
      setTimeout(countDownTimer, 1000);
    };

    countDownTimer();
  }, []);

  return (
    <ul id="countdown">
      <li id="days">
        <div className="number">{days}</div>
        <div className="label">Days</div>
      </li>
      <li id="hours">
        <div className="number">{hours}</div>
        <div className="label">Hours</div>
      </li>
      <li id="minutes">
        <div className="number">{minutes}</div>
        <div className="label">Minutes</div>
      </li>
      <li id="seconds">
        <div className="number">{seconds}</div>
        <div className="label">Seconds</div>
      </li>
    </ul>
  );
};

export default Countdown;