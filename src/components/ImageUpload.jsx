import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/utils/firebase";

function ImageUpload({ handleGetImageUrl }) {
  const storage = getStorage(app);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleImageUpload = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    // uniqye number
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setUploadPercentage(progress);
      },
      (error) => {
        setLoading(false);
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          handleGetImageUrl(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div>
      {loading && (
        <div className="fixed  top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div>
            Image Uploading..
            {uploadPercentage} %{" "}
          </div>
        </div>
      )}
      <input
        type="file"
        className="mb-4 p-2 rounded border border-gray-300 w-full"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {selectedFile && (
        <div>
          <img src={selectedFile} alt="" className="h-40 w-30 pb-5" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
