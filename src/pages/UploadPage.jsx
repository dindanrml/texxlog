// import React, { useState } from "react";
// import { db, addDoc, collection } from "../firebase";
// import Header from "../components/header";

// const UploadPage = () => {
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [creator, setCreator] = useState("");
//   const [category, setCategory] = useState("");

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     const docRef = await addDoc(collection(db, "textures"), {
//       image,
//       description,
//       creator,
//       category,
//       star: 0,
//     });
//     console.log(docRef.id);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Header />
//       <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
//         <h1 className="text-2xl font-bold mb-4">Upload Texture</h1>
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//   <form onSubmit={handleUpload}>
//     <input
//       type="text"
//       placeholder="Image URL"
//       className="block w-full p-2 border rounded-lg mb-4"
//       onChange={(e) => setImage(e.target.value)}
//     />
//     <input
//       type="text"
//       placeholder="Description"
//       className="block w-full p-2 border rounded-lg mb-4"
//       onChange={(e) => setDescription(e.target.value)}
//     />
//     <input
//       type="text"
//       placeholder="Creator"
//       className="block w-full p-2 border rounded-lg mb-4"
//       onChange={(e) => setCreator(e.target.value)}
//     />
//     <input
//       type="text"
//       placeholder="Category"
//       className="block w-full p-2 border rounded-lg mb-4"
//       onChange={(e) => setCategory(e.target.value)}
//     />
//     <button className="w-full p-2 bg-blue-500 text-white rounded-lg">
//       Upload
//     </button>
//   </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default UploadPage;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../components/header";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";

const UploadPage = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const storage = getStorage(app);
  const db = getFirestore(app);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setPreview(URL.createObjectURL(uploadedFile));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image to upload");
      return;
    }
    setUploading(true);

    const storageRef = ref(storage, `textures/${file.name}`);
    await uploadBytes(storageRef, file).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImage(downloadURL);
      setUploading(false);
    });

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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-3xl space-y-10 border border-solid border-blue-950">
        <h1 className="text-3xl font-bold text mb-4">Upload Texture</h1>
        <form onSubmit={handleUpload}>
          <div
            {...getRootProps(image)}
            className="border-2 border-slate-800 border-dashed p-10 text-center cursor-pointer bg-gray-50 space-y-4 mb-4"
            onChange={(e) => setImage(e.target.value)}
          >
            <input {...getInputProps(image)} />
            <p className="text-gray-500">
              Drag & drop your files here, or click to select
            </p>
          </div>
          {files.map((file) => (
            <img
              key={file.name}
              src={file.preview}
              alt={file.name}
              className="w-full h-auto object-cover rounded-lg shadow space-y-4"
            />
          ))}
          <input
            type="text"
            placeholder="Image URL"
            className="block w-full p-2 border border-blue-950 rounded-full space-x-4 mb-4 "
            onChange={(e) => setImage(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Description"
            className="block w-full p-2 border border-blue-950 rounded-full space-x-4 mb-4 "
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Creator"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            onChange={(e) => setCreator(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-950 text-white rounded-full hover:bg-blue-900">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

//     <div className="min-h-screen bg-gray-100">
//       <Header />
//       <main class="text-center">
//         <h2 class="text-3xl font-bold mb-8">Upload Texture</h2>
//         <form onSubmit={handleUpload}>
//           <div
//             {...getRootProps(image)}
//             class="border-2 border-dashed border-gray-400 p-8 mb-4"
//             onChange={(e) => setImage(e.target.value)}
//           >
//             <input {...getInputProps(image)} />
//             <p class="text-gray-500">Drag or Drop files here</p>
//           </div>
//           <div class="space-y-4">
//             <input
//               class="border border-gray-300 p-2 w-64"
//               placeholder="Description"
//               type="text"
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <input
//               class="border border-gray-300 p-2 w-64"
//               placeholder="Creator"
//               type="text"
//               onChange={(e) => setCreator(e.target.value)}
//             />
//             <input
//               class="border border-gray-300 p-2 w-64"
//               placeholder="Category"
//               type="text"
//               onChange={(e) => setCategory(e.target.value)}
//             />
//             <button class="bg-gray-800 text-white px-4 py-2">Submit</button>
//           </div>
//         </form>
//       </main>
//     </div>
//   );
// };

export default UploadPage;
