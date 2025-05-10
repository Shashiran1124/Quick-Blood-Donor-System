import React from 'react';

const RegistrationFoot = ({ socialLinks, quickLinks, featuresLinks, contactDetails, footerLinks }) => {
  return (
    <footer
      style={{
        backgroundColor: '#1a2a44',
        color: '#fff',
        padding: '0.5rem 2rem',
        animation: 'fadeIn 1s ease-out',
        marginTop:"8px"
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
           {/*  {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{
                  color: '#ccc',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                {link.icon}
              </a>
            ))} */}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           {/*  {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                {link.text}
              </a>
            ))} */}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Features</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* {featuresLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.color = '#fff')}
                onMouseOut={(e) => (e.target.style.color = '#ccc')}
              >
                {link.text}
              </a>
            ))} */}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h3>
        {/*   {contactDetails.map((detail, index) => (
            <p key={index} style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {detail}
            </p>
          ))} */}
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
        {/*   {footerLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              style={{
                color: '#ccc',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.color = '#fff')}
              onMouseOut={(e) => (e.target.style.color = '#ccc')}
            >
              {link.text}
            </a>
          ))} */}
        </div>
      </div>
    </footer>
  );
};

export default RegistrationFoot;
