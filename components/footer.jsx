import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer bg-dark text-light">
      <p className="m-0 ms-3 p-0">Copyright &copy; Traveller App {year}</p>
    </footer>
  );
};

export default Footer;
