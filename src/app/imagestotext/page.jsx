"use client"
import { useState } from 'react';

export default function ScanToText() {
  const [infoText, setInfoText] = useState('');

  // Placeholder for camera click logic (e.g., scanning and processing)
  const handleCameraClick = () => {
    setInfoText('Scanned Text Appears Here!');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#86c5d8', padding: '20px 30px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <a className="navbar-brand" href="#" style={{ fontWeight: 'bold', fontSize: '24px', color: '#00354e' }}>
          <i className="bi bi-ear" style={{ marginRight: '8px' }}></i> IHear
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: '20px' }}>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="../Kiki_HomePage_1302220020 (Terbaru)/homepage.html" style={{ fontSize: '18px', marginRight: '20px', color: '#00354e', display: 'flex', alignItems: 'center' }}>
                <i className="bi bi-house-door" style={{ marginRight: '8px' }}></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../Relations/dashboardRelations.html" style={{ fontSize: '18px', marginRight: '20px', color: '#00354e', display: 'flex', alignItems: 'center' }}>
                <i className="bi bi-globe" style={{ marginRight: '8px' }}></i> Relations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../rizkykusuma_page/lesson.html" style={{ fontSize: '18px', marginRight: '20px', color: '#00354e', display: 'flex', alignItems: 'center' }}>
                <i className="bi bi-book" style={{ marginRight: '8px' }}></i> Lesson
              </a>
            </li>
          </ul>
        </div>
        <div className="profile-icon" style={{ marginLeft: 'auto' }}>
          <a href="../arga_page/profile.html">
            <img src="https://via.placeholder.com/40" className="rounded-full" alt="Profile" style={{ width: '45px', height: '45px', border: '2px solid #fff' }} />
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center gap-16 py-8 bg-gray-100 max-w-7xl mx-auto">
        {/* Camera Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-64 h-96 border-2 border-teal-400 rounded-xl flex items-center justify-center">
            {/* Placeholder for camera stream */}
          </div>
          <button
            className="mt-6 w-12 h-12 bg-teal-400 rounded-full flex items-center justify-center shadow-md cursor-pointer"
            onClick={handleCameraClick}
          >
            <img src="/assets/images/camera.png" alt="Camera Icon" className="w-8 h-8" />
          </button>
        </div>

        {/* Info Section */}
        <div className="w-96 h-96 bg-teal-100 rounded-xl p-5">
          <h2 className="text-lg font-semibold">Scanned Text</h2>
          <p className="mt-4">{infoText || 'Scanned text will appear here.'}</p>
        </div>
      </div>
    </div>
  );
}
	
