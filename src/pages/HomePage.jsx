import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTextures } from "../features/textureSlice";
import Header from "../components/header";
import TextureCard from "../components/TextureCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Homepage = () => {
  const dispatch = useDispatch();
  const { textures, status } = useSelector((state) => state.texture);

  useEffect(() => {
    dispatch(fetchTextures());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-5xl mx-auto p-6 text-center font-display">
        <div className="flex gap-4 justify-center mb-6">
          <main className="text-center">
            <h2 className="text-3xl font font-color mb-8">
              Explore Stunning Textures from Leading Creators
            </h2>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {status === "loading" ? (
                <p>Loading...</p>
              ) : (
                textures.map((texture) => (
                  <TextureCard key={texture.id} texture={texture} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default Homepage;

{
  /* <input
            type="text"
            placeholder="Search textures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-3 bg-blue-500 text-white rounded-lg">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </button>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div> */
}

{
  /* Display Textures */
}
