"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isMicActive, setIsMicActive] = useState(false);
  const [transcript, setTranscript] = useState(""); // Set initial transcript to an empty string
  const [nomer, setNomer] = useState("001"); // Set default nomer as "001"
  const [history, setHistory] = useState([]); // State for storing transcript history
  const recognitionRef = useRef(null); // Reference to store the recognition instance

  useEffect(() => {
    // Retrieve userId from localStorage and log it
    const userId = localStorage.getItem("userId");
    console.log("User ID:", userId);

    // Retrieve transcript from localStorage if it exists
    const savedTranscript = localStorage.getItem("transcript");
    if (savedTranscript) {
      setTranscript(savedTranscript);
    }

    // Fetch history of transcripts from API
    fetchHistory();
  }, []); // Runs once when the component mounts

  // Function to fetch history of transcripts from the API
  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/transkrip/nomer/${nomer}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data); // Log all response data for debugging

        // Check if there is a valid transcript and set it to state
        if (data && Array.isArray(data)) {
          setHistory(data); // Update history state with the fetched data
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

  // Function to start Voice Recognition
  const startRecognition = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "id-ID"; // Set to Indonesian

      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const newTranscript = transcript + event.results[i][0].transcript + " ";
            setTranscript(newTranscript);

            // Save the new transcript to localStorage
            localStorage.setItem("transcript", newTranscript);

            // Send transcript to server
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

      // Store the recognition instance in the ref
      recognitionRef.current = recognition;

      recognition.start();
      setIsMicActive(true); // Update the mic status
    } else {
      alert("Speech Recognition not supported in this browser.");
    }
  };

  // Function to stop Voice Recognition
  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort(); // Use abort() to stop the recognition
      setIsMicActive(false); // Update the mic status
    }
    setTranscript(""); // Clear the transcript when stop is pressed
  };

  // Function to send transcript data to the server
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
        // Update history after successfully sending the new transcript
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
        flexDirection: "row", // Change to row layout for left-right structure
        justifyContent: "space-between",
        height: "100vh",
        padding: "2rem",
      }}
    >
      {/* Left Section (Current Transcript) */}
      <div
        style={{
          width: "60%", // Width for the main transcript area
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

        {/* Middle Section */}
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
              width: "80%",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
              minHeight: "150px",
              overflowY: "auto",
            }}
          >
            {transcript || "Kata-kata Anda akan muncul di sini..."} {/* Initial text is empty */}
          </div>
        </div>

        {/* Bottom Section */}
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

      {/* Right Section (History of Transcripts) */}
      <div
        style={{
          width: "35%", // Width for the history section
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
