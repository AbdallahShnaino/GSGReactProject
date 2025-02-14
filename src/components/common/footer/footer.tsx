import "./footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p>© 2022 Embrace, Inc. - All Rights Reserved</p>
      </div>
      <div className="footer__links">
        <p className="footer__link">
          <a href="#">Terms of use</a>
        </p>
        <p className="footer__link">
          <a href="#">Privacy policy</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
