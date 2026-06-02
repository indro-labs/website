import "./Footer.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Indro Labs</h4>
          <p>Continuous radon protection monitoring</p>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <p>info@indrolabs.ca</p>
        </div>

        <div className="footer-column">
          <h4>Location</h4>
          <p>Alberta, Canada</p>
        </div>

        <div className="footer-column">
          <h4>Follow us</h4>
          <p>Alberta, Canada</p>
        </div>
      </div>

      <div className="footer-bottom">
        Copyright © 2026 Indro Labs - All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;