import React, { useState } from "react";
import { db, addDoc, collection } from "../firebase";
import Header from "../components/header";

const UploadPage = () => {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "textures"), {
      image,
      description,
      creator,
      category,
      star: 0,
    });
    console.log(docRef.id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
        <h1 className="text-2xl font-bold mb-4">Upload Texture</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleUpload}>
            <input
              type="text"
              placeholder="Image URL"
              className="block w-full p-2 border rounded-lg mb-4"
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="block w-full p-2 border rounded-lg mb-4"
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Creator"
              className="block w-full p-2 border rounded-lg mb-4"
              onChange={(e) => setCreator(e.target.value)}
            />
            <input
              type="text"
              placeholder="Category"
              className="block w-full p-2 border rounded-lg mb-4"
              onChange={(e) => setCategory(e.target.value)}
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded-lg">
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UploadPage;
