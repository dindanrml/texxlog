import React from "react";

const Header = () => (
  <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
    <h1 className="text-2xl font-bold">Texxlog</h1>
    <nav className="space-x-4">
      <a href="/" className="hover:underline">
        Home
      </a>
      <a href="/artwork" className="hover:underline">
        Artwork
      </a>
      <a href="/texture" className="hover:underline">
        Texture
      </a>
    </nav>
  </header>
);
export default Header;
