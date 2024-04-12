"use client";
import ImageUpload from "@/components/ImageUpload";
import { api } from "@/utils/api";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [category, setCategory] = useState({
    name: "",
    image: "",
  });

  const handleGetImageUrl = (url) => {
    console.log("url: ", url);
    if (url) {
      setCategory((prev) => ({
        ...prev,
        image: url,
      }));
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await api.post("/api/categories", category);
      console.log("response: ", response.data);
      toast.success("Category Created Successfully!");
    } catch (error) {
      toast.error("Somthing gets wrong!");
      console.log("error: ", error);
    }
  };
  return (
    <main>
      <div className="p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Category</h2>
        <ImageUpload handleGetImageUrl={handleGetImageUrl} />
        <input
          type="text"
          placeholder="Enter Category Name"
          className="mb-4 p-2 rounded border border-gray-300 w-full"
          onChange={(evet) => {
            setCategory((prevValue) => ({
              ...prevValue,
              name: event.target.value,
            }));
          }}
        />
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleCreateCategory}
        >
          Create Category
        </button>
      </div>
    </main>
  );
}
