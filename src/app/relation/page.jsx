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
    <nav className="fixed top-0 left-0 w-full bg-[#86c5d8] py-5 px-7 shadow-md flex items-center justify-between z-50">
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
  const [editingPost, setEditingPost] = useState(null); // Postingan yang sedang diedit
  const [isEditing, setIsEditing] = useState(false); // Status modal

  let userId = localStorage.getItem("userId");

  // digunakan utk menyimpan id yang login pd website ke dalam localstorage
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

  // post
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

  // button likes
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

  // delete
  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus postingan ini?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/api/postingan/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Postingan berhasil dihapus.");
        // Perbarui daftar postingan setelah menghapus
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        alert("Gagal menghapus postingan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  // edit
  const handleUpdate = (post) => {
    console.log("Update clicked:", post); // Debugging
    // Simpan data postingan yang akan diupdate ke state
    setEditingPost(post);

    // Tampilkan modal atau form update
    setIsEditing(true);
  };

  useEffect(() => {
    console.log("isEditing:", isEditing);
  }, [isEditing]);

  // simpan update
  const handleSaveUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/postingan/${editingPost.id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ kontenPostingan: editingPost.kontenPostingan }),
        }
      );

      if (response.ok) {
        alert("Postingan berhasil diperbarui.");
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === editingPost.id
              ? { ...post, kontenPostingan: editingPost.kontenPostingan }
              : post
          )
        );
        setIsEditing(false);
      } else {
        alert("Gagal memperbarui postingan.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
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
      <div className="bg-[#F5F5FA] items-start py-10 px-8 flex gap-8 mt-20">

        {/* Left Column */}
        <div className="flex flex-col items-center bg-white border-2 border-gray-300 rounded-xl p-4 w-1/4 h-auto">
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
              className="bg-white border-2 border-gray-300 rounded-xl w-full p-4 mb-6 relative"
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
                <span className="ml-4 text-gray-500">{likesCount[post.id]} likes</span>
              </div>
              {post.username === `${formPostingan.name}` && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(post)}
                    className="text-blue-500 text-sm font-bold hover:underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 text-sm font-bold hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}

              {/* form edit */}
              {isEditing && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-bold mb-4">Update Postingan</h2>
                    <textarea
                      value={editingPost.kontenPostingan}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, kontenPostingan: e.target.value })
                      }
                      className="w-full border border-gray-300 p-2 rounded-lg mb-4"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveUpdate()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
