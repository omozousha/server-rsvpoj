import React, { useEffect } from 'react';
import './Home.css';

const Home = () => {
  useEffect(() => {
    // Smooth scrolling functionality
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      });
    });

    // Show/hide scroll-to-top button
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        scrollToTopButton.style.display = 'block';
      } else {
        scrollToTopButton.style.display = 'none';
      }
    });

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });

    // Add active class to dot navigation when corresponding section is active
    const sections = document.querySelectorAll('.section');
    const dotNavigationLinks = document.querySelectorAll('.dot-navigation a');

    function setActiveSection() {
      const currentSectionIndex = Array.from(sections).findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      dotNavigationLinks.forEach((link) => link.classList.remove('active'));
      dotNavigationLinks[currentSectionIndex].classList.add('active');
    }

    window.addEventListener('scroll', setActiveSection);

    // Remove cover and play music when button is clicked
    const removeCoverButton = document.querySelector('.remove-cover-button');
    const cover = document.querySelector('.cover');
    removeCoverButton.addEventListener('click', () => {
      cover.style.display = 'none';
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.play();
    });

    // Play music when the page is visible
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.play();
      }
    });

    document.addEventListener('DOMContentLoaded', function () {
      const tabs = document.querySelectorAll('.tab');
      const indicator = document.querySelector('.indicator');

      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const tabTarget = tab.getAttribute('data-tab');
          indicator.style.left = tab.offsetLeft + 'px';
          // Add logic to switch content based on tabTarget (e.g., show/hide sections)
          console.log('Switch to tab:', tabTarget);
        });
      });
    });
  }, []);

  return (
    <div>
      <div className="cover">
        <h1>Welcome to my project</h1>
        <button className="remove-cover-button">Next</button>
      </div>
      <audio id="audioPlayer" src="https://example.com/music03a.mp3"></audio>

      <div className="tab-container">
        <button>
          <a href="#section1">Bride</a>
        </button>
        <button>
          <a href="#section2">Our Story</a>
        </button>
        <button>
          <a href="#section3">Date</a>
        </button>
        <button>
          <a href="#section4">Gallery</a>
        </button>
        <button>
          <a href="#section5">Maps</a>
        </button>
        <button>
          <a href="#section6">Gift</a>
        </button>
        <button>
          <a href="#section7">Greetings</a>
        </button>
      </div>

      <div className="section" id="section1">
        <p>Section 1</p>
      </div>
      <div className="section" id="section2">
        Section 2
      </div>
      <div className="section" id="section3">
        Section 3
      </div>
      <div className="section" id="section4">
        Section 4
      </div>
      <div className="section" id="section5">
        Section 5
      </div>
      <div className="section" id="section6">
        Section 6
      </div>
      <div className="section" id="section7">
        Section 7
      </div>

      <div className="scroll-to-top">Back to Top</div>

      <div className="dot-navigation">
        <a href="#section1" className="active">Section 1</a>
        <a href="#section2">Section 2</a>
        <a href="#section3">Section 3</a>
        <a href="#section4">Section 4</a>
        <a href="#section5">Section 5</a>
        <a href="#section6">Section 6</a>
        <a href="#section7">Section 7</a>
        {/* Add more sections here */}
      </div>
    </div>
  );
};

export default Home;