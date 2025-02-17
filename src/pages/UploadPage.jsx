import React from "react";
const UploadPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
    <h1 className="text-2xl font-bold mb-4">Upload Texture</h1>
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <input type="file" className="block w-full p-2 border rounded-lg mb-4" />
      <input
        type="text"
        placeholder="Description"
        className="block w-full p-2 border rounded-lg mb-4"
      />
      <input
        type="text"
        placeholder="Creator"
        className="block w-full p-2 border rounded-lg mb-4"
      />
      <button className="w-full p-2 bg-blue-500 text-white rounded-lg">
        Upload
      </button>
    </div>
  </div>
);
export default UploadPage;
