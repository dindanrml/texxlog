import React from "react";
import Logo from "./Texxlog.png";

const Header = () => (
  <header className="p-6 bg-white text-slate-900 flex justify-between items-center">
    <img src={Logo} alt="Texxlog logo" className="h-24"></img>
    <nav className="space-x-4">
      <a href="/" className="hover:underline">
        Home
      </a>
      <a href="/texture" className="hover:underline">
        Texture
      </a>
    </nav>
  </header>
);
export default Header;
