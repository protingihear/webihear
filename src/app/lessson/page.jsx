"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { HomeIcon, GlobeAltIcon, BriefcaseIcon, PencilIcon } from "@heroicons/react/solid";

{/* NAVBAR */}
export function Navbar({ profilePic }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/signin"; // Redirect to sign-in page
  };

  return (
    <nav className="bg-[#86c5d8] py-5 px-7 shadow-md flex items-center justify-between">
      {/* Logo Section */}
      <a className="text-xl font-bold text-[#00354e] flex items-center mr-10" href="#">
        IHear
      </a>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        {/* Home Link */}
        <a
          href="/home"
          className="text-lg text-white flex items-center"
        >
          <HomeIcon className="h-6 w-6 text-[#00354e] mr-2" />
          Home
        </a>

        {/* Relations Link */}
        <a
          href="/relation"
          className="text-lg text-white flex items-center"
        >
          <GlobeAltIcon className="h-6 w-6 text-[#00354e] mr-2" />
          Relations
        </a>

        {/* Lesson Link */}
        <a
          href="/lessson"
          className="text-lg text-white flex items-center"
        >
          <BriefcaseIcon className="h-6 w-6 text-[#00354e] mr-2" />
          Lesson
        </a>
      </div>

      {/* Profile Section */}
      <div className="relative ml-auto">
        <img
          id="profile-pic"
          src={profilePic || "/assets/images/imgProfile.png"} // Fallback to default if profilePic is not available
          alt="Profile"
          className="rounded-full border-2 border-white w-[45px] h-[45px] cursor-pointer"
          onClick={toggleDropdown}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40">
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function LessonPage() {
  const [categories, setCategories] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  // Fetch categories dari API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories"); // Ganti dengan URL API Anda
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  

  return (
    <>
      {/* Metadata */}
      <Head>
        <title>Lesson Page - IHear</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Progres pembelajaran IHear" />
      </Head>

      {/* Halaman */}
      <div className="min-h-screen bg-gray-100 font-sans">
        {/* Navbar */}
        <Navbar profilePic={profilePic} />
        {/* Container */}
        <div className="flex gap-6 p-8">
          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    window.open(
                      "https://youtu.be/arAzoJ5aFZ4?si=MSYYTi2eFlN5OrlC",
                      "_blank"
                    )
                  }
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer"
                >
                  <div className="text-gray-500 font-medium text-sm mb-2">
                    {category.description}
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="/assets/images/placeholderlasson1.png"
                      alt="Lesson Icon"
                      className="w-40 mb-4"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-4">
                    {category.name}
                  </h3>
                  <div className="bg-gray-200 rounded-full h-2 w-full">
                    <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Loading categories...</p>
            )}
          </div>

          {/* Progress Section */}
          <div className="w-1/4">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/profile-picture.png"
                alt="Profile Picture"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">Puri Lalita Anagata</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Progres</h3>
              <div className="bg-gray-200 p-4 rounded-lg">
                <div className="flex gap-2 items-end">
                  {[60, 80, 40, 90, 70, 50, 60].map((height, index) => (
                    <div
                      key={index}
                      className="w-6 bg-blue-500 rounded-t-md"
                      style={{ height: `${height}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
