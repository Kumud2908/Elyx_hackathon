import React, { useEffect, useState } from "react";
import MemberTimeline from "../components/MemberTimeline";
import PersonaCard from "../components/PersonaCard";
import EventDetail from "../components/EventDetail";

export default function MemberJourneyPage({ memberId }) {
  const [events, setEvents] = useState([]);
  const [persona, setPersona] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_APP_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/events/${memberId}`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));

    fetch(`${API_BASE_URL}/api/persona/${memberId}`)
      .then(res => res.json())
      .then(data => setPersona(data))
      .catch(err => console.error(err));
  }, [memberId]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <PersonaCard persona={persona} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          marginTop: "24px",
          // KEY CHANGE: Stretch items to match height
          alignItems: "stretch", 
        }}
      >
        {/* Event Detail Container */}
        <div style={{ flex: "2" }}>
          {selectedEvent ? (
            <EventDetail
              event={selectedEvent}
              onBack={() => setSelectedEvent(null)}
            />
          ) : (
            // Placeholder when no event is selected
            <div
              style={{
                height: "100%",
                backgroundColor: "#1f2937",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "1.5rem",
                border: "1px dashed #d1d5db",
                padding: "2rem",
              }}
            >
              <p>Select an event from the timeline to see details.</p>
            </div>
          )}
        </div>

        {/* Timeline Container */}
        <div style={{ flex: "1" }}>
          <MemberTimeline events={events} onSelect={setSelectedEvent} />
        </div>
      </div>
    </div>
  );
}