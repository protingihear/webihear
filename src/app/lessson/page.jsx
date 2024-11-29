import React from "react";
import Head from "next/head";

export default function LessonPage() {
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
        <nav className="bg-[#86c5d8] shadow-md py-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fas fa-ear-listen text-2xl text-[#00354e]"></i>
            <span className="font-bold text-2xl text-[#00354e]">IHear</span>
          </div>
          <div className="flex gap-8">
            <a
              href="/homepage"
              className="text-[#00354e] text-lg flex items-center gap-2 hover:underline"
            >
              <i className="fas fa-home"></i> Home
            </a>
            <a
              href="/relations"
              className="text-[#00354e] text-lg flex items-center gap-2 hover:underline"
            >
              <i className="fas fa-globe"></i> Relations
            </a>
            <a
              href="/lesson"
              className="text-[#00354e] text-lg flex items-center gap-2 hover:underline"
            >
              <i className="fas fa-book"></i> Lesson
            </a>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </nav>

        {/* Container */}
        <div className="flex gap-6 p-8">
          {/* Card Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
            {/* Repeated Card */}
            {[...Array(6)].map((_, index) => (
              <a
                href="/lessonCourse"
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="text-gray-500 font-medium text-sm mb-2">
                  25 Kata
                </div>
                <div className="flex justify-center">
                  <img
                    src="/assets/images/placeholderlasson1.png"
                    alt="Lesson Icon"
                    className="w-40 mb-4"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center mb-4">
                  Sapaan
                </h3>
                <div className="bg-gray-200 rounded-full h-2 w-full">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
              </a>
            ))}
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
