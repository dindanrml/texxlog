import React from "react";
const TextureCard = ({ texture }) => (
  <div className="border border-solid border-blue-950 rounded-lg shadow-lg overflow-hidden space-y-10 ">
    <div className="bg-white text-white text-center text-sm p-2">
      <img
        src={texture.image}
        alt={texture.description}
        className="w-full h-40 object-cover"
      />
    </div>
    {/* <img
      src="https://www.freepik.com/free-photo/white-paper-texture_1012237.htm#fromView=search&page=1&position=0&uuid=a98913bb-1f14-47a2-84e0-a25499dc30c8&query=texture"
      className="w-full h-40 object-cover"
    /> */}
    <div className="p-2">
      <p className="text-lg font-semibold">{texture.description}</p>
      <p className="text-sm text-gray-500">Category: {texture.category}</p>
    </div>
  </div>
);
export default TextureCard;
