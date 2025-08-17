import React from "react";
import MemberJourneyPage from "./Pages/MemberJourneyPage";

export default function App() {
  // Change this to the actual memberId you want to test
  const memberId = "64e123abcde4567890f12345";

  const mainContainerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6", // equivalent to bg-gray-100
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 0", // equivalent to py-12
  };

  const contentCardStyle = {
    backgroundColor: "#ffffff", // equivalent to bg-white
    borderRadius: "1rem", // equivalent to rounded-2xl (roughly)
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)", // equivalent to shadow-xl
    padding: "2px", // equivalent to p-8
   
  };

  return (
    <div style={mainContainerStyle}>
      <div style={contentCardStyle}>
        {/*
          <h1 style={{ fontSize: "1.875rem", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
            Elyx Member Journey
          </h1>
        */}
        <MemberJourneyPage memberId={memberId} />
      </div>
    </div>
  );
}