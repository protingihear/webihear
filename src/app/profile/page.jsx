
"use client"
import { useState } from 'react';

export default function Home() {
  const [profilePic, setProfilePic] = useState('');
  const [gender, setGender] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: 'NANTI NAMA DARI LOCAL STORAGE',
    bio: '',
    email: '',
    password: ''
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setIsEdit(false);
    // Save logic here
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col items-center mr-8 relative">
        <img
          id="profile-pic"
          src={profilePic || 'https://via.placeholder.com/250'}
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
        <button
          className="absolute bottom-12 right-4 bg-white border-2 border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-sm cursor-pointer"
          onClick={() => document.getElementById('profile-pic-input').click()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm1.415 3L11 1.707 13.293 4l1.268-1.268zM10.5 3.5L2 12v1h1l8.5-8.5-1-1zM1 13v2h2l-.5-.5L2.707 13H1zm12.5-2.5h-1V9h1v1.5zm-3 3h-1v-1h1v1zm1-5h-1V6h1v2.5zm-3 0h-1V6h1v2.5zm-4 0h-1V6h1v2.5zm3 3h-1v-1h1v1z" />
          </svg>
        </button>
        <button
          className="btn btn-primary mt-3 bg-blue-500 text-white p-2 rounded"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <form id="sign-up-form" className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold text-lg">Nama</label>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded-md"
              id="name"
              value={formData.name}
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio" className="font-bold text-lg">Bio</label>
            <textarea
              className="p-3 border border-gray-300 rounded-md"
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold text-lg">Jenis Kelamin</label>
            <div
              id="gender-view"
              className="p-3 border border-gray-300 rounded-md"
            >
              <span id="gender-display">{gender || 'Select Gender'}</span>
            </div>
            <div id="gender-edit" className={isEdit ? '' : 'hidden'}>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="gender-p"
                  name="gender"
                  value="P"
                  onChange={() => setGender('P')}
                  checked={gender === 'P'}
                />
                <label htmlFor="gender-p">P</label>
                <input
                  type="radio"
                  id="gender-l"
                  name="gender"
                  value="L"
                  onChange={() => setGender('L')}
                  checked={gender === 'L'}
                />
                <label htmlFor="gender-l">L</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-bold text-lg">Email</label>
            <input
              type="email"
              className="p-3 border border-gray-300 rounded-md"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEdit}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">Password</label>
            <input
              type="password"
              className="p-3 border border-gray-300 rounded-md"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={!isEdit}
            />
          </div>
          {isEdit && (
            <button
              type="button"
              className="bg-green-500 text-white p-3 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
