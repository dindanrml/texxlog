import React from "react";
const TextureCard = ({ texture }) => (
  <div className="border rounded-lg shadow-lg overflow-hidden">
    <img
      src={texture.image}
      alt={texture.name}
      className="w-full h-40 object-cover"
    />
    <div className="p-2">
      <p className="text-lg font-semibold">{texture.name}</p>
      <p className="text-sm text-gray-500">Category: {texture.category}</p>
    </div>
  </div>
);
export default TextureCard;
