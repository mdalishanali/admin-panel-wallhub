"use client";
import ImageUpload from "@/components/ImageUpload";
import { api } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddWallpaper() {
  const [categories, setCategories] = useState([]);
  const [wallpaper, setWallpaper] = useState({
    name: "",
    image: "",
    category: "",
  });
  console.log("wallpaper: ", wallpaper);

  useEffect(() => {
    getAllCategories();
  }, []);
  // get all categories
  const getAllCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response?.data?.category);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const handleGetImageUrl = (url) => {
    setWallpaper((prev) => ({ ...prev, image: url }));
  };
  const handleCreateWallpaper = async () => {
    try {
      const response = await api.post("/api/wallpapers", wallpaper);
      toast.success("Wallpaper created successfully!");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="p-5">
      <Link
        href={"/add-category"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Category
      </Link>
      <div className="mt-10 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Create Wallpaper</h2>
        <ImageUpload handleGetImageUrl={handleGetImageUrl} />
        <input
          type="text"
          placeholder="Enter wallpaper name"
          className="mb-4 p-2 rounded border border-gray-300 w-full"
          onChange={(event) => {
            setWallpaper((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
        <select
          className="mb-4 p-2 rounded border border-gray-300 w-full"
          value={wallpaper.category}
          onChange={(event) => {
            setWallpaper((prev) => ({ ...prev, category: event.target.value }));
          }}
        >
          <option value={""}>Select a category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleCreateWallpaper}
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Wallpaper
        </button>
      </div>
    </main>
  );
}
