"use client";
import React, { useEffect, useState } from "react";
import { HomeIcon, GlobeAltIcon, BriefcaseIcon, PencilIcon } from "@heroicons/react/solid";

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

const RelationsPage = () => {
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formPostingan, setFormPostingan] = useState({
    name: "",
  });

  const [likedPosts, setLikedPosts] = useState(new Set()); // Menggunakan Set untuk menyimpan ID postingan yang di-like
  const [image, setImage] = useState(null); // State untuk menyimpan file gambar
  const [kontenPostingan, setKontenPostingan] = useState(""); // State untuk konten postingan
  const [likesCount, setLikesCount] = useState(
    posts.reduce((acc, post) => {
      acc[post.id] = post.likes;
      return acc;
    }, {})
  );

  let userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/teman-tuli/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          setProfilePic(data.picture || "https://via.placeholder.com/250");
          setFormPostingan({
            name: `${data.firstName || ""} ${data.lastName || ""}`,
          });
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError(`Failed to load profile data: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      window.location.href = "/signin"; // Redirect to sign-in page
    }
  }, [userId]);

  // digunakan untuk get, manampilkan postingan yg ada pd table
  useEffect(() => {
    fetch("http://localhost:8000/api/postingan")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handlePostSubmit = () => {
    if (!kontenPostingan.trim()) {
      alert("Konten postingan tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("kontenPostingan", kontenPostingan);
    formData.append("username", formPostingan.name || "Anonymous"); // Gunakan name dari formPostingan
    if (image) {
      formData.append("image", image); // Hanya tambahkan gambar jika ada
    }

    // digunakan untuk post, utk mmbuat postingan baru
    fetch("http://localhost:8000/api/postingan", {
      method: "POST",
      body: formData, // Gunakan FormData sebagai body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengirim postingan.");
        }
        return response.json();
      })
      .then((data) => {
        setPosts([data, ...posts]); // Tambahkan postingan baru ke daftar
        setKontenPostingan(""); // Reset textarea
        setImage(null); // Reset file gambar
        window.location.href = "/relation"; // Refresh laman
      })
      .catch((error) => console.error("Error posting data:", error));
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/postingan/toggle-like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.status === "liked") {
        setLikedPosts((prev) => new Set(prev).add(postId));
      } else if (data.status === "unliked") {
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }

      // Perbarui jumlah likes untuk postingan terkait
      setLikesCount((prev) => ({
        ...prev,
        [postId]: data.likes,
      }));
    } catch (error) {
      console.error("Error while toggling like:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <Navbar profilePic={profilePic} />

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
          <div className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6">
            <div className="flex items-center mb-4">
              <img
                src={profilePic || "/assets/images/imgProfile.png"}
                alt="Profile"
                className="rounded-full w-12 h-12 mr-4"
              />
              <textarea
                className="border-2 border-gray-300 rounded-lg w-full h-13 p-3 resize-none outline-none"
                placeholder="Bagikan Kegiatan Anda!!"
                value={kontenPostingan}
                onChange={(e) => setKontenPostingan(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Gambar (Opsional)
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <button
              className="bg-[#B0D9E3] text-white py-2 px-6 rounded-full mt-4 float-right"
              onClick={handlePostSubmit}
            >
              Post
            </button>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6"
            >
              <p className="font-bold text-lg">{post.username}</p>
              <p className="text-sm text-gray-500 mb-4">
                {new Date(post.created_at).toLocaleString()}
              </p>
              <p className="text-gray-800">{post.kontenPostingan}</p>
              {post.image && (
                <img
                  src={`http://127.0.0.1:8000/storage/${post.image}`}
                  alt="Post"
                  className="w-full mt-4 rounded-lg"
                />
              )}
              <div className="mt-4 flex items-center">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`px-4 py-2 rounded-lg text-white font-semibold ${likedPosts.has(post.id) ? "bg-red-500" : "bg-blue-500"
                    }`}
                >
                  {likedPosts.has(post.id) ? "Unlike" : "Like"}
                </button>
                <span className="ml-4 text-gray-500">
                  {likesCount[post.id]} likes
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
