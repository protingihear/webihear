"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isMicActive, setIsMicActive] = useState(false);

  const handleMicClick = () => {
    setIsMicActive(!isMicActive);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      {/* Bagian Atas */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "7rem",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Mulai
          <br />
          Menerjemahkan
        </h1>
      </div>

      {/* Bagian Tengah */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/assets/images/waveform.png"
          alt="Waveform"
          width={500}
          height={200}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      {/* Bagian Bawah */}
      <div
        style={{
          backgroundColor: "#D2EDF4",
          borderTopLeftRadius: "200px",
          borderTopRightRadius: "200px",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          {/* Stop Button */}
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
              backgroundColor: isMicActive ? "gray" : "#dc3545",
              cursor: "pointer",
            }}
          >
            <i
              className="bi bi-x"
              style={{
                fontSize: "40px",
                color: "white",
              }}
            ></i>
          </div>

          {/* Mic Button */}
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
              backgroundColor: isMicActive ? "#28a745" : "gray",
              cursor: "pointer",
            }}
            onClick={handleMicClick}
          >
            <i
              className="bi bi-mic"
              style={{
                fontSize: "40px",
                color: "white",
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
