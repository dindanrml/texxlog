import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTextures } from "../features/textureSlice";
import Header from "../components/header";
import TextureCard from "../components/TextureCards";

const Homepage = () => {
  const dispatch = useDispatch();
  const { textures, status } = useSelector((state) => state.texture);

  useEffect(() => {
    dispatch(fetchTextures());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Explore Stunning Textures & Artwork from Leading Creators
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded-lg"
        />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : (
            textures.map((texture) => (
              <TextureCard key={texture.id} texture={texture} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Homepage;
