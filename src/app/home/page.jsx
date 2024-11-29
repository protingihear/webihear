"use client";
import { useState } from "react";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

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

  return (
    <div className="bg-[#F5F5FA] min-h-screen font-sans">
      {/* Navbar */}
      <div className="bg-[#9FD8E5] sticky top-0 z-10 py-4">
        <nav className="flex items-center justify-between px-8 max-w-7xl mx-auto">
          <div className="flex items-center text-white font-bold text-lg">
            <span className="mr-2">IHear</span>
          </div>
          <ul className="flex gap-8">
            <li>
              <a href="#home" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#relations" className="text-white hover:underline">
                Relations
              </a>
            </li>
            <li>
              <a href="#lesson" className="text-white hover:underline">
                Lesson
              </a>
            </li>
          </ul>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </nav>
      </div>

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
