import { useEffect, useRef } from "react";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "de94dujde",
        uploadPreset: "texture-image",
      },
      function (error, result) {
        console.log(result);
        // Handle the result or error here
      }
    );
  }, []);

  return (
    <button
      type="submit"
      onClick={() => widgetRef.current.open()}
      className="w-full p-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 disabled:opacity-50"
    >
      Upload Texture
    </button>
  );
};

export default UploadWidget;
