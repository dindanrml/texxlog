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

// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import Header from "../components/header";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { app } from "../firebase";

// const UploadPage = () => {
//   const [files, setFiles] = useState([]);
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [creator, setCreator] = useState("");
//   const [category, setCategory] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   const storage = getStorage(app);
//   const db = getFirestore(app);

//   const onDrop = useCallback((acceptedFiles) => {
//     const uploadedFile = acceptedFiles[0];
//     setFile(uploadedFile);
//     setPreview(URL.createObjectURL(uploadedFile));
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setMessage("Please select an image to upload");
//       return;
//     }
//     setUploading(true);

//     const storageRef = ref(storage, `textures/${file.name}`);
//     await uploadBytes(storageRef, file).then(async (snapshot) => {
//       const downloadURL = await getDownloadURL(snapshot.ref);
//       setImage(downloadURL);
//       setUploading(false);
//     });

//     const docRef = await addDoc(collection(db, "textures"), {
//       image,
//       description,
//       creator,
//       category,
//       star: 0,
//     });
//     console.log(docRef.id);
//   };

// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import {
//   db,
//   storage,
//   collection,
//   addDoc,
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from "../firebase";
// import Header from "../components/header";

// const UploadPage = () => {
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [creator, setCreator] = useState("");
//   const [category, setCategory] = useState("");

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   const handleUpload = async (e) => {
//     setUploading(true);
//     try {
//       for (const file of files) {
//         const storageRef = ref(storage, `textures/${file.name}`);
//         await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(storageRef);

//         await addDoc(collection(db, "textures"), {
//           name: file.name,
//           image: url,
//           category: "",
//           description: "No description provided.",
//         });
//       }
//       e.preventDefault();
//       const docRef = await addDoc(collection(db, "textures"), {
//         image,
//         description,
//         creator,
//         category,
//         star: 0,
//       });
//       console.log(docRef.id);
//       setFiles([]);
//       alert("Upload successful!");
//     } catch (error) {
//       console.error("Error uploading files: ", error);
//       alert("Upload failed.");
//     }
//     setUploading(false);
//     console.log("Upload complete");
//   };
// };

// return (
//   <div className="min-h-screen bg-gray-100">
//     <Header />
//     <div className="max-w-5xl mx-auto p-6 text-center font-display">
//       <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-3xl border border-solid border-blue-950 font-display pt-100">
//         <h1 className="text-3xl font text mb-4">Upload Texture</h1>
//         <form onSubmit={handleUpload}>
//           <div
//             {...getRootProps()}
//             className="border-2 border-slate-800 border-dashed p-10 text-center cursor-pointer bg-gray-50 space-y-4 mb-4"
//             onChange={(e) => setImage(e.target.value)}
//           >
//             <input {...getInputProps()} />
//             <p className="text-gray-500">
//               Drag & drop your files here, or click to select
//             </p>
//           </div>
//           {files.map((file) => (
//             <img
//               key={file.name}
//               src={file.preview}
//               alt={file.name}
//               className="w-full h-auto object-cover rounded-lg shadow space-y-4"
//             />
//           ))}
//           <div className="pt-10">
//             <input
//               type="text"
//               placeholder="Image URL"
//               className="block w-full p-2 border border-blue-950 rounded-full space-y-4 mb-4 "
//               onChange={(e) => setImage(e.target.value)}
//             ></input>
//             <input
//               type="text"
//               placeholder="Description"
//               className="block w-full p-2 border border-blue-950 rounded-full space-x-4 mb-4 "
//               onChange={(e) => setDescription(e.target.value)}
//             ></input>
//             <input
//               type="text"
//               placeholder="Creator"
//               className="block w-full p-2 border border-blue-950 rounded-full mb-4"
//               onChange={(e) => setCreator(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Category"
//               className="block w-full p-2 border border-blue-950 rounded-full mb-4"
//               onChange={(e) => setCategory(e.target.value)}
//             />
//             <button className="w-full p-2 bg-blue-950 text-white rounded-full hover:bg-blue-900">
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// );

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

import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import Header from "../components/header";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/de94dujde/image/upload";
const UPLOAD_PRESET = "texture-image";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      await addDoc(collection(db, "textures"), {
        name: image.name,
        image: data.secure_url,
        category: category || "Uncategorized",
        description: description || "No description provided.",
        creator: creator || "Unknown",
        star: 0,
      });

      setImage(null);
      setDescription("");
      setCreator("");
      setCategory("");
      alert("Upload successful!");
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Upload failed.");
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-3xl border border-solid border-blue-950">
        <h1 className="text-3xl font-bold mb-4">Upload Texture</h1>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            onChange={handleImageChange}
          />
          <input
            type="text"
            placeholder="Description"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Creator"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="block w-full p-2 border border-blue-950 rounded-full mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-950 text-white rounded-full hover:bg-blue-900 disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
