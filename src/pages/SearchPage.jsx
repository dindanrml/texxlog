import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/HeaderComponent";
import TextureCard from "../components/TextureCards";
import { fetchTextures } from "../features/textureSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/FooterComponent";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { textures, status } = useSelector((state) => state.texture);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredTextures, setFilteredTextures] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    dispatch(fetchTextures());
  }, [dispatch]);

  useEffect(() => {
    if (textures.length === 0) return;

    let results = textures;

    // Filter by category (excluding "All")
    if (selectedCategory !== "All") {
      results = results.filter(
        (texture) => texture.category && texture.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchTriggered && searchQuery.trim() !== "") {
      results = results.filter(
        (texture) =>
          texture.name &&
          texture.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTextures(results);
  }, [searchQuery, selectedCategory, textures, searchTriggered]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  // Extract categories safely
  const categories = [
    "All",
    ...new Set(textures.map((t) => t.category).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-5xl mx-auto p-6 text-center font-display">
        <h1 className="text-3xl font-bold mb-4">Search Textures</h1>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Search textures..."
            className="w-full p-2 border border-blue-950 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="p-3 bg-blue-950 text-white rounded-xl hover:bg-blue-900 ml-2"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-1/4 p-3 border border-blue-950 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Display Textures */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : filteredTextures.length > 0 ? (
            filteredTextures.map((texture) => (
              <TextureCard key={texture.id} texture={texture} />
            ))
          ) : (
            <p className="text-gray-500">No textures found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Header from "../components/header";
// import TextureCard from "../components/TextureCards";
// import { fetchTextures } from "../features/textureSlice";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// const SearchPage = () => {
//   const dispatch = useDispatch();
//   const { textures, status } = useSelector((state) => state.texture);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [filteredTextures, setFilteredTextures] = useState([]);

//   useEffect(() => {
//     dispatch(fetchTextures());
//   }, [dispatch]);

//   useEffect(() => {
//     let results = textures;

//     if (selectedCategory !== "All") {
//       results = results.filter(
//         (texture) => texture.category === selectedCategory
//       );
//     }

//     results = results.filter(
//       (texture) =>
//         texture.name &&
//         texture.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setFilteredTextures(results);
//   }, [searchQuery, selectedCategory, textures]);

//   const categories = [
//     "All",
//     ...new Set(textures.map((texture) => texture.category)),
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <div className="max-w-5xl mx-auto p-6 text-center font-display">
//         <h1 className="text-3xl font-bold mb-4">Search Textures</h1>
//         <div className="flex items-center justify-center mb-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full p-2 border border-blue-950 rounded-xl"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="p-3 bg-blue-950 text-white rounded-xl hover:bg-blue-900 ml-2">
//             <FontAwesomeIcon icon={faMagnifyingGlass} />
//           </button>
//         </div>

//         <select
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-1/4 p-3 border border-blue-950 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
//         >
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>

//         <div className="grid grid-cols-3 gap-4 mt-6">
//           {filteredTextures.map((texture) => (
//             <TextureCard key={texture.id} texture={texture} />
//           ))}
//         </div>

//         <div className="grid grid-cols-3 gap-4 mt-6">
//           {status === "loading" ? (
//             <p>Loading...</p>
//           ) : (
//             textures.map((texture) => (
//               <TextureCard key={texture.id} texture={texture} />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SearchPage;
