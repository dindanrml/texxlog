import React from "react";

const Footer = () => {
  return (
    <footer className="p-5 bg-slate-100 text-blue-950 flex justify-between items-center border border-b-500 border-slate-300">
      <p>&copy; {new Date().getFullYear()} Texxlog App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
