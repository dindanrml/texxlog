import React from "react";
const DetailPage = () => (
  <div className="min-h-screen bg-white p-6">
    <h1 className="text-2xl font-bold">Texture Detail</h1>
    <div className="mt-4">
      <img
        src="/path-to-texture"
        alt="Texture"
        className="w-full max-w-md mx-auto rounded-lg"
      />
      <p className="mt-2 text-center">Texture Name</p>
    </div>
  </div>
);
export default DetailPage;
