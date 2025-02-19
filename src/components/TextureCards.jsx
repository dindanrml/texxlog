import React from "react";
const TextureCard = ({ texture }) => (
  <div className="border rounded-lg shadow-lg overflow-hidden">
    <img
      src={texture.image}
      alt={texture.description}
      className="w-full h-40 object-cover"
    />
    {/* <img
      src="https://texturelabs.org/wp-content/uploads/Texturelabs_Wood_260S.jpg"
      className="w-full h-40 object-cover"
    /> */}
    <div className="p-2">
      <p className="text-lg font-semibold">{texture.description}</p>
      <p className="text-sm text-gray-500">Category: {texture.category}</p>
    </div>
  </div>
);
export default TextureCard;
