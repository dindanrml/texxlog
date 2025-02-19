import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/header";

const DetailPage = () => {
  const { id } = useParams();
  const texture = useSelector((state) =>
    state.texture.textures.find((t) => t.id === id)
  );

  if (!texture) return <p className="text-center mt-10">Texture not found</p>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{texture.name}</h1>
        <img
          src={texture.image}
          alt={texture.name}
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <p className="mt-4 text-gray-700">{texture.description}</p>
        <p className="mt-2 text-gray-500">Category: {texture.category}</p>
      </div>
    </div>
  );
};
export default DetailPage;
