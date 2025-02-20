import React from "react";
import Logo from "./Texxlog 2.png";

const Header = () => (
  <header className="p-5 bg-slate-300 text-blue 950 flex justify-between items-center">
    <img src={Logo} alt="Texxlog logo" className="h-10"></img>
    <nav className="space-x-10 font-bold ">
      <a href="/" className="hover:underline">
        Home
      </a>
      <a href="/search" className="hover:underline">
        Search
      </a>
      <a href="/upload" className="hover:underline">
        Upload
      </a>
    </nav>
  </header>
);
export default Header;
