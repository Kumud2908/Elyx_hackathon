import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function MemberTimeline({ events, onSelect }) {
  const VISIBLE_COUNT = 8;
  const [startIndex, setStartIndex] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(null);

  if (!events || events.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          color: "#999999", // Adjusted color for better contrast
          backgroundColor: "#f5f5f5", // Light background
          borderRadius: "0.5rem",
          border: "1px dashed #cccccc", // Subtle border
          marginTop: "1rem",
        }}
      >
        <p>No events to display in timeline.</p>
      </div>
    );
  }

  const totalEvents = events.length;

  const handleNext = () => {
    if (startIndex + VISIBLE_COUNT < totalEvents) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < totalEvents;

  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.1rem",
    borderRadius: "9999px",
    border: "none",
    fontWeight: "bold",
    transition: "background-color 0.2s, color 0.2s",
    cursor: "pointer",
  };
  const prevButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: canGoPrev ? "#555555" : "#cccccc",
    color: canGoPrev ? "#fff" : "#999999",
    cursor: canGoPrev ? "pointer" : "not-allowed",
  };
  const nextButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: canGoNext ? "#555555" : "#cccccc",
    color: canGoNext ? "#fff" : "#999999",
    cursor: canGoNext ? "pointer" : "not-allowed",
  };
  const iconStyle = { fontSize: "1rem", height: "1rem", width: "1rem" };

  return (
    <div
      style={{
        padding: "0.5rem",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)", // Softer shadow
        borderRadius: "1rem",
        border: "1px solid #e0e0e0",
        backgroundColor: "#e8e8e8", // Card background
        color: "#444444", // Main text color
        marginTop: "0rem",
        transition: "box-shadow 0.3s",
        position: "relative",
      }}
    >
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#444444",
          marginBottom: "1rem",
          borderBottom: "1px solid #cccccc",
          paddingBottom: "0.5rem",
        }}
      >
        Member Progress Timeline
      </h3>

      {/* Vertical Timeline Structure */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          height: VISIBLE_COUNT * 50,
          overflow: "hidden",
        }}
      >
        {/* The Vertical Line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: "3px", // A little thinner for elegance
            backgroundColor: "#cccccc",
            transform: "translateX(-50%)",
          }}
        />

        {/* Timeline dots and labels container */}
        <div
          style={{
            width: "100%",
            position: "relative",
            transition: "transform 0.3s ease-in-out",
            transform: `translateY(-${startIndex * 50}px)`,
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {events.map((event, index) => (
            <div
              key={event._id}
              style={{
                display: "flex",
                alignItems: "center",
                height: "50px",
                position: "relative",
                cursor: "pointer",
                transition: "color 0.2s",
                fontWeight: selectedEventId === event._id ? "bold" : "normal",
                color: selectedEventId === event._id ? "#444444" : "#666666",
              }}
              onClick={() => {
                setSelectedEventId(event._id);
                if (onSelect) {
                  onSelect(event);
                }
              }}
            >
              {/* The Dot */}
              <div
  style={{
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: "16px",
    height: "16px",
    backgroundColor: selectedEventId === event._id ? "#ccffcc" : "#bfbfbf",
    border: "2px solid #555555",
    borderRadius: "50%",
    zIndex: 1,
  }}
/>
              
              {/* The Label (Date) */}
              <div
                style={{
                  position: "absolute",
                  right: "1.5rem",
                  textAlign: "right",
                  fontSize: "0.875rem",
                }}
              >
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalEvents > VISIBLE_COUNT && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2px",
            gap: "0.5rem",
          }}
        >
          <button onClick={handlePrev} disabled={!canGoPrev} style={prevButtonStyle}>
            <FaChevronUp style={iconStyle} />
          </button>
          <span
            style={{
              color: "#444444",
              fontSize: "0.875rem",
              fontWeight: "300",
            }}
          >
            {Math.min(startIndex + 1, totalEvents)} -{" "}
            {Math.min(startIndex + VISIBLE_COUNT, totalEvents)} of {totalEvents}
          </span>
          <button onClick={handleNext} disabled={!canGoNext} style={nextButtonStyle}>
            <FaChevronDown style={iconStyle} />
          </button>
        </div>
      )}
    </div>
  );
}