import React, { useEffect, useState } from "react";
import { fetchEvents } from "../utils/api";

export default function EventList({ memberId, onSelect }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents(memberId);
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, [memberId]);

  if (loading) return <div>Loading events...</div>;
  if (!events.length) return <div>No events found for this member.</div>;

  return (
    <div>
      {events.map((event) => (
        <div
          key={event._id}
          style={{
            padding: "10px",
            margin: "5px 0",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => onSelect(event)}
        >
          <strong>{event.type || "Event"}</strong>{" "}
          {event.timestamp && `— ${new Date(event.timestamp).toLocaleString()}`}
        </div>
      ))}
    </div>
  );
}
