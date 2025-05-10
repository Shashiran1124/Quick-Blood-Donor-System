// src/components/Icomponents/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../images/image1.jpg';

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  // Split the heading text into individual characters for animation
  const headingText = "Efficient Blood Collection Management";
  const middleIndex = Math.floor(headingText.length / 2); // Find the middle for ripple effect
  const headingChars = headingText.split('').map((char, index) => {
    // "Blood" spans positions 10 to 14 (inclusive) in "Efficient Blood Inventory Management"
    const isBloodChar = index >= 10 && index <= 14; // Positions for "B", "l", "o", "o", "d"
    const distanceFromMiddle = Math.abs(index - middleIndex); // For ripple effect
    return (
      <span
        key={index}
        style={{
          display: 'inline-block',
          opacity: 0, // Start with opacity 0
          animation: `pulse 0.5s ease forwards`, // Apply pulse animation
          animationDelay: `${distanceFromMiddle * 0.05}s`, // Ripple effect
          fontSize: '52px',fontFamily: 'Poppins, sans-serif',
           marginBotttom: '17px',
          color: isBloodChar ? '#C70039' : '#000000', // Only "Blood" is red, all others are black
        }}
      >
        {char === ' ' ? '\u00A0' : char} {/* Handle spaces correctly */}
      </span>
    );
  });

  return (
    <div
      style={{
        minHeight: '80vh',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',

        
      }}
    >
      {/* Inline CSS for Animations */}
      <style>
        {`

          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes pulse {
            0% {
              opacity: 0;
              transform: scale(0.5); /* Start small */
            }
            50% {
              opacity: 1;
              transform: scale(1.2); /* Pulse larger */
            }
            100% {
              opacity: 1;
              transform: scale(1); /* Settle at normal size */
            }
          }
        `}
      </style>

      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: '#1a2a44',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 1s ease-out',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <span style={{ color: '#ff4d4f', marginRight: '0.5rem' }}>🩸</span>
          <span style={{ color: '#c3c3c3',fontSize: '13px' }}>Quick</span>
          <span style={{ color: '#8B0000',fontSize: '17px' }}>Blood</span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
          }}
        >
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
          >
            Home
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/dashBloodInventoryForm')}
          >
            Inventory
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/dashsentBloodForm')}
          >
            Donations
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
            onClick={() => navigate('/Dashinvlevel ')}
          >
            Level
          </a>
          <a
            href="#"
            style={{
              textDecoration: 'none',
              color: '#ffffff',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              fontSize: '18px',
            }}
            onMouseOver={(e) => (e.target.style.color = '#ff4d4f')}
            onMouseOut={(e) => (e.target.style.color = '#ffffff')}
          >
            Report
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4rem 2rem',
          backgroundColor: '#fff5f5',
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',

          
        }}
      >
        <div
          style={{
            maxWidth: '50%',
            animation: 'slideInLeft 1s ease-out',
          }}
          
        >
          <h1
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}
          >
            {headingChars}
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#666',
              marginBottom: '2rem',
            }}
          >
            Streamline your blood bank operations with our comprehensive inventory tracking and management system.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <button
              onClick={handleGetStarted}
              style={{
                backgroundColor: '#C70039',
                color: '#fff',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '23px',
                transition: 'transform 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Shchedule An Appointment <span>→</span>
            </button>
          </div>
        </div>
        <div
          style={{
            maxWidth: '40%',
            animation: 'slideInRight 1s ease-out',
          }}
        >
          <img
            src={image1}
            alt="Blood donation"
            style={{
              width: '135%',
              height: '78vh',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(1, 1, 1, 0.1)',
            }}
          />
          <img
  src={image1}
  alt="Blood Transparency"
  onClick={handleGetStarted} // Add this line
  style={{
    position: 'absolute',
    top: '50%',
    left: '40%',
    display: 'flex',
    transform: 'translate(-80%, -50%)',
    width: '95%',
    height: '100vh',
    opacity: 0.07,
    cursor: 'pointer', // Add this to indicate clickability
    pointerEvents: 'auto', // Ensure it receives click events
  }}
/>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a2a44',
          color: '#fff',
          padding: '0.5rem 2rem',
          animation: 'fadeIn 1s ease-out',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '0.5rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>QuickBlood</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Advanced blood inventory management system for efficient blood bank operations.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              <a
                href="#"
                style={{
                  color: '#ccc',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                🐦 {/* Added a Twitter icon */}
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                📘 {/* Added a Facebook icon */}
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                📸
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                💼
              </a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Home
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                About Us
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Services
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Contact
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Blog
              </a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Features</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Inventory Management
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Donor Records
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Analytics Dashboard
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Supply Chain
              </a>
              <a
                href="#"
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                Reports
              </a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              123 Medical Center Drive
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              San Francisco, CA 94103
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Email: info@quickblood.com
            </p>
            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #ccc',
            paddingTop: '1rem',
            fontSize: '0.9rem',
          }}
        >
          <p>© 2025 QuickBlood. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href="#"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#ccc')}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#ccc')}
            >
              Terms of Service
            </a>
            <a
              href="#"
              style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#ccc')}
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

