"use client";
import { useState } from "react";
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

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const userId = localStorage.getItem("userId");
  console.log("User ID dari localStorage:", userId);

  const newsItems = [
    {
      id: 1,
      image: "assets/hp1.png",
      title: "Cerita Inspiratif Nadya, Wisudawan Teman Tuli yang Lulus Cepat & Cum Laude dari ITS",
    },
    {
      id: 2,
      image: "assets/hp2.png",
      title: "Menginspirasi Dalam Sunyi, Nuraga Gelar Talk Show bersama Teman Tuli",
    },
    {
      id: 3,
      image: "assets/hp3.png",
      title: "Inovasi Teknologi Tuli: Membuka Peluang Baru untuk Komunikasi Inklusif",
    },
    {
      id: 4,
      image: "assets/hp4.png",
      title: "Transformasi Kehidupan Teman Tuli: Cerita dari Sudut Pandang Mereka",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const [profilePic, setProfilePic] = useState("");

  return (
    <div className="bg-[#F5F5FA] min-h-screen font-sans">
      {/* Navbar */}
      <Navbar profilePic={profilePic} />

      {/* Hero Section */}
      <div className="mt-8 px-8 max-w-7xl mx-auto">
        <div className="bg-[#B5E6F3] p-6 rounded-lg shadow-md text-center">
          <h2 className="text-[#3B8C98] text-sm font-medium">
            IHear Membantumu
          </h2>
          <h1 className="text-[#3B8C98] text-2xl font-bold">
            Yuk Jelajahi Dunia Tuli Bersama!
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section: Communication Tools */}
        <div className="flex-1 bg-[#EAF6FA] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-6">Your Communication</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-[#3B8C98] p-6 rounded-lg shadow-lg">
                <img
                  src="assets/mic.png"
                  alt="Voice to Text"
                  className="mx-auto w-16 h-16"
                />
                <p className="mt-4 text-white font-semibold">Voice to Text</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#3B8C98] p-6 rounded-lg shadow-lg">
                <img
                  src="assets/scan.png"
                  alt="Scan to Text"
                  className="mx-auto w-16 h-16"
                />
                <p className="mt-4 text-white font-semibold">Scan to Text</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: News */}
        <div className="w-full lg:w-[35%]">
          {currentNewsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md mb-6 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-medium">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
