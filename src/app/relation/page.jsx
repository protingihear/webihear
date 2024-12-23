"use client";

import React, { useEffect, useState } from 'react';

const RelationsPage = () => {
  const [posts, setPosts] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/postingan')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="bg-[#86c5d8] py-5 px-7 shadow-md flex items-center justify-between">
        <a className="text-xl font-bold text-[#00354e] flex items-center" href="#">
          <i className="fas fa-ear-listen mr-2"></i> IHear
        </a>

        <div className="hidden md:flex space-x-8">
          <a
            href="../Kiki_HomePage_1302220020 (Terbaru)/homepage.html"
            className="text-lg text-[#00354e] flex items-center"
          >
            <i className="fas fa-home mr-2"></i> Home
          </a>
          <a
            href="../Relations/dashboardRelations.html"
            className="text-lg text-[#00354e] flex items-center"
          >
            <i className="fas fa-globe mr-2"></i> Relations
          </a>
          <a
            href="../rizkykusuma_page/lesson.html"
            className="text-lg text-[#00354e] flex items-center"
          >
            <i className="fas fa-book mr-2"></i> Lesson
          </a>
        </div>

        <a href="../arga_page/profile.html" className="ml-auto">
          <img
            src="/assets/images/imgProfile.png"
            alt="Profile"
            className="rounded-full border-2 border-white w-[45px] h-[45px]"
          />
        </a>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="bg-[#F5F5FA] py-10 px-8 flex gap-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-xl p-4 w-1/4">
          <button className="bg-[#499CB1] text-white py-2 px-6 rounded-full text-lg mb-6 flex items-center">
            <img src="/assets/images/icon/people.png" className="mr-2 w-6" />
            Community
          </button>

          {/* Profiles */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center w-full border border-gray-300 rounded-lg p-2 mb-4"
            >
              <img
                src="/assets/images/imgProfile.png"
                alt="Profile"
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <p className="text-lg font-bold">Yazid Al Adnan</p>
                <p className="text-sm text-gray-500">Diikuti oleh 200 orang</p>
              </div>
            </div>
          ))}
        </div>

        {/* MIDDLE COLUMN */}
        <div className="flex flex-col items-center w-2/4">
          {/* Input Post */}
          <div className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6">
            <div className="flex items-center">
              <img
                src="/assets/images/imgProfile.png"
                alt="Profile"
                className="rounded-full w-12 h-12 mr-4"
              />
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full h-13 p-3 resize-none outline-none"
                placeholder="Bagikan Kegiatan Anda!!"
              />
            </div>
            <button className="bg-[#B0D9E3] text-white py-2 px-6 rounded-full mt-4 float-right">
              Post
            </button>
          </div>

          {/* Post Content */}
          <div className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6">
            <p className="font-bold text-lg">Yazid Al Adnan</p>
            <p className="text-sm text-gray-500 mb-4">Be Kind 🌻</p>
            <p className="text-gray-800">
              Kebaikan tidak mengenal warna kulit, bahasa, atau latar belakang. Kita semua satu
              dalam perbedaan, memperkuat satu sama lain dengan cinta dan empati. Mari rayakan
              keragaman, inklusivitas, dan kasih sayang. Jangan lupa untuk selalu berbuat baik,
              sekecil apa pun itu, karena dampaknya luar biasa! 💛✨
            </p>
            <img src="/assets/images/bekind.png" alt="" className="items-center"/>
            <div className="mt-4 flex items-center">
              <span className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-heart"></i>
                <img src="/assets/images/icon/Love.png" className="w-6 h-6" />
                <span className="pr-2">10</span>
              </span>
              <span className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-comment"></i>
                <img src="/assets/images/icon/icon.png" className="w-6 h-6" />
                <span className="pr-2">2</span>
              </span>
              <span className="flex items-center space-x-2 text-gray-500">
                <i className="fas fa-comment"></i>
                <img src="/assets/images/icon/icon(1).png" className="w-6 h-6" />
              </span>
            </div>
          </div>
          {posts.map((post) => (
            <div key={post.id} className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6">
              <p className="font-bold text-lg">{post.username}</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="text-gray-800">{post.kontenPostingan}</p>
              {post.image && <img src={post.image} alt="Post" className="w-full mt-4 rounded-lg" />}
              <div className="mt-4 flex items-center">
                <span className="flex items-center space-x-2 text-gray-500">
                  <i className="fas fa-heart"></i>
                  <img src="/assets/images/icon/Love.png" className="w-6 h-6" />
                  <span className="pr-2">{post.likes}</span>
                </span>
                <span className="flex items-center space-x-2 text-gray-500">
                  <i className="fas fa-comment"></i>
                  <img src="/assets/images/icon/icon.png" className="w-6 h-6" />
                  <span className="pr-2">{post.comments}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-1/4">
          <div className="bg-white border-2 border-gray-300 rounded-xl p-4">
            <div className="flex items-center mb-6">
              <img src="/assets/images/icon/Search.png" className="w-6 h-6 mr-4" />
              <p className="text-gray-500 text-lg font-bold">Search</p>
            </div>

            <div>
              <p className="text-lg font-bold text-[#00354e] mb-4">Who To Follow</p>
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src="/assets/images/imgProfile.png"
                      alt="Profile"
                      className="rounded-full w-10 h-10 mr-4"
                    />
                    <div>
                      <p className="text-md font-bold">Yazid Al Adnan</p>
                      <p className="text-sm text-gray-500">@yazidal</p>
                    </div>
                  </div>
                  <button className="bg-[#499CB1] text-white py-1 px-3 rounded-full text-sm">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelationsPage;
