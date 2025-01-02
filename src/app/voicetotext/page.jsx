"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isMicActive, setIsMicActive] = useState(false);
  const [transcript, setTranscript] = useState(""); 
  const [nomer, setNomer] = useState("001"); 
  const [history, setHistory] = useState([]); 
  const recognitionRef = useRef(null); 

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    const savedTranscript = localStorage.getItem("transcript");
    if (savedTranscript) {
      setTranscript(savedTranscript);
    }

    fetchHistory();
  }, []); 

  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/transkrip/nomer/${nomer}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data); 

        if (data && Array.isArray(data)) {
          setHistory(data);
        } else {
          console.error("No valid transcript data found");
        }
      } else {
        console.error("Failed to fetch history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const startRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "id-ID"; 

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const newTranscript = transcript + event.results[i][0].transcript + " ";
            setTranscript(newTranscript);

            
            localStorage.setItem("transcript", newTranscript);

            
            sendTranscriptToServer(nomer, newTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error: ", event.error);
      };

      recognition.onend = () => {
        setIsMicActive(false);
      };

      recognitionRef.current = recognition;

      recognition.start();
      setIsMicActive(true); 
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  };


  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsMicActive(false); 
    }
    setTranscript("");
  };


  const sendTranscriptToServer = async (nomer, newTranscript) => {
    try {
      const response = await fetch("http://localhost:8000/api/transkrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomer: nomer,
          transkrip: newTranscript,
        }),
      });

      if (response.ok) {
        console.log("Transcript successfully sent!");
        fetchHistory();
      } else {
        console.error("Failed to send transcript:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending transcript:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", 
        justifyContent: "space-between",
        height: "100vh",
        padding: "2rem",
      }}
    >
      {/* Left Section  */}
      <div
        style={{
          width: "60%", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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

        {/* tengah */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "1.2rem",
              color: "black",
              textAlign: "center",
              width: "100%",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              minHeight: "200px",
              overflowY: "auto",
            }}
          >
            {"Kata-kata Anda akan muncul di sini..."} 
          </div>
        </div>

        {/*bawah*/}
        <div
          style={{
            backgroundColor: "#D2EDF4",
            borderTopLeftRadius: "200px",
            borderTopRightRadius: "200px",
            marginTop: "300px",
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
            {/* Start Button */}
            {!isMicActive && (
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#28a745",
                  cursor: "pointer",
                }}
                onClick={startRecognition}
              >
                <i
                  className="bi bi-mic"
                  style={{
                    fontSize: "40px",
                    color: "white",
                  }}
                ></i>
              </div>
            )}

            {/* Stop Button */}
            {isMicActive && (
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#dc3545",
                  cursor: "pointer",
                }}
                onClick={stopRecognition}
              >
                <i
                  className="bi bi-x"
                  style={{
                    fontSize: "40px",
                    color: "white",
                  }}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* kanan*/}
      <div
        style={{
          width: "35%", 
          padding: "1rem",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>History Transkrip</h3>
        <div
          style={{
            fontSize: "1rem",
            color: "black",
            padding: "1rem",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            minHeight: "150px",
            overflowY: "auto",
          }}
        >
          {history.length > 0 ? (
            history.map((item, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p>{item.transkrip}</p>
              </div>
            ))
          ) : (
            <p>Tidak ada history transkrip.</p>
          )}
        </div>
      </div>
    </div>
  );
}
