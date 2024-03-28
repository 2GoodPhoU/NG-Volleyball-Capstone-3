import React from "react";

const Footer = () => {
  const handleAboutClick = () => {
    console.log("About clicked");
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
  };

  const handleInformationClick = () => {
    console.log("Information clicked");
  };

  return (
    <footer style={{ backgroundColor: "#333", color: "#fff", padding: "7px", textAlign: "center", position: "fixed", left: 0, bottom: 0, width: "100%", zIndex: 100 }}>
      <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "14px" }}>About Us</h3>
          <a href="#" onClick={handleAboutClick} style={{ fontSize: "12px" }}></a>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "14px" }}>Contact</h3>
          <a href="#" onClick={handleContactClick} style={{ fontSize: "12px" }}></a>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "14px" }}>Learn More</h3>
          <a href="#" onClick={handleInformationClick} style={{ fontSize: "12px" }}></a>
        </div>
      </div>
      <p style={{ marginTop: "10px", marginBottom: "0", fontSize: "10px" }}>© {new Date().getFullYear()} Northrop Grumman. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
