"use client";

import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { useRouter } from "next/navigation";

function ErrorModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

{/* NAVBAR */}
export function Navbar() {
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

      <div className="relative ml-auto">
        <img
          src="/assets/images/imgProfile.png"
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


export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState("");
  const [gender, setGender] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    password: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  // Retrieve userId from local storage or set a default value
let userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8000/api/teman-tuli/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setProfilePic(data.picture || "https://via.placeholder.com/250");
          setGender(data.gender || "");
          setFormData({
            name: `${data.firstName || ""} ${data.lastName || ""}`,
            bio: data.bio || "",
            email: data.email || "",
            password: "", // Password remains empty
          });
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setError("Failed to load profile data. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      window.location.href = "/signin"; // Redirect to sign-in page
    }
  }, [userId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (!password) return true; // Optional password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "email") {
      setValidationErrors((prev) => ({
        ...prev,
        email: validateEmail(value)
          ? ""
          : "Email must be valid (e.g., example@domain.com).",
      }));
    }

    if (id === "password") {
      setValidationErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters, include a number, a symbol, and an uppercase letter.",
      }));
    }
  };

  const handleSave = () => {
    if (validationErrors.email || validationErrors.password) {
      return;
    }

    const form = new FormData();

    const [firstName, ...lastNameArr] = formData.name.split(" ");
    const lastName = lastNameArr.join(" ");

    form.append("firstName", firstName || "");
    form.append("lastName", lastName || "");
    form.append("bio", formData.bio);
    form.append("email", formData.email || "");
    form.append("gender", gender || "");

    if (formData.password.trim() !== "") {
      form.append("password", formData.password);
    }

    if (profilePic.startsWith("blob:")) {
      const fileInput = document.getElementById("profile-pic-input");
      if (fileInput && fileInput.files[0]) {
        form.append("picture", fileInput.files[0]);
      }
    }

    fetch(`http://localhost:8000/api/teman-tuli/${userId}/update`, {
      method: "POST",
      body: form,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save profile data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile updated successfully:", data);
        setError(null);
        setIsEdit(false);
        setFormData((prev) => ({ ...prev, password: "" }));
      })
      .catch((err) => {
        setModalMessage(err.message);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const closeModal = () => {
    setModalMessage("");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  } 

  return (
    <>
      <Navbar />
  
      {/* Main Content */}
      <div className="flex justify-center mt-5">
        {modalMessage && <ErrorModal message={modalMessage} onClose={closeModal} />}
        <div className="flex flex-col items-center mr-8 relative">
          <img
            id="profile-pic"
            src={profilePic}
            alt="Profile Picture"
            className="w-64 h-64 rounded-full border-8 border-white shadow-lg"
          />
          <input
            type="file"
            id="profile-pic-input"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
  
          {isEdit && (
            <button
              className="absolute right-4 bg-white border-2 border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm cursor-pointer"
              style={{ bottom: "200px" }}
              onClick={() => document.getElementById("profile-pic-input").click()}
            >
              <PencilIcon className="w-6 h-6 text-gray-500" />
            </button>
          )}
          {isEdit ? (
            <button
              className="btn btn-primary mt-3 bg-green-500 text-white p-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-primary mt-3 bg-blue-500 text-white p-2 rounded"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
        <div className="w-full max-w-2xl">
          <form id="profile-form" className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="font-bold text-lg">
                Nama
              </label>
              <input
                type="text"
                className="p-3 border border-gray-300 rounded-md"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEdit}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bio" className="font-bold text-lg">
                Bio
              </label>
              <textarea
                className="p-3 border border-gray-300 rounded-md"
                id="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEdit}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-lg">Jenis Kelamin</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="L"
                    checked={gender === "L"}
                    onChange={() => setGender("L")}
                    disabled={!isEdit}
                  />{" "}
                  Laki-laki
                </label>
                <label>
                  <input
                    type="radio"
                    value="P"
                    checked={gender === "P"}
                    onChange={() => setGender("P")}
                    disabled={!isEdit}
                  />{" "}
                  Perempuan
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-lg">
                Email
              </label>
              <input
                type="email"
                className="p-3 border border-gray-300 rounded-md"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEdit}
              />
              {validationErrors.email && (
                <p className="text-red-500">{validationErrors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold text-lg">
                Password
              </label>
              <input
                type="password"
                className="p-3 border border-gray-300 rounded-md"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={!isEdit}
              />
              {validationErrors.password && (
                <p className="text-red-500">{validationErrors.password}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );  
}
