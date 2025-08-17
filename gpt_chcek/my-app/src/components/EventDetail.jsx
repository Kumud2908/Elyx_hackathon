import React, { useEffect, useState } from "react";

export default function EventDetail({ event, onBack }) {
  const [why, setWhy] = useState("");
  const [messages, setMessages] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_APP_URL || "http://localhost:5000";

  useEffect(() => {
    if (!event?._id) return;

    // Fetch reason why
    fetch(`${API_BASE_URL}/api/why/${event._id}`)
      .then(res => res.json())
      .then(data => {
        setWhy(data.summary || "No explanation found.");
      })
      .catch(err => console.error(err));

    // Fetch related messages
    fetch(`${API_BASE_URL}/api/messages/${event._id}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, [event?._id]);

  function formatDate(isoString) {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch {
      return isoString;
    }
  }

  function cleanSummary(summary) {
    if (!summary) return null;

    const reasonMatch = summary.match(/Reason\s*[:-]?\s*\*{0,2}\s*(.+)/i);
    const initiatorMatch = summary.match(/Initiator\s*[:-]?\s*\*{0,2}\s*(.+)/i);
    const referencesMatch = summary.match(/References?\s*[:-]?\s*\*{0,2}([\s\S]*)/i);

    let references = [];
    if (referencesMatch) {
      references = referencesMatch[1]
        .replace(/\*+/g, "")
        .split("\n")
        .map(line => line.trim())
        .filter(line => line && !/^Note:/i.test(line))
        .map(line => {
          const iso = line.match(/\[(.*?)\]/);
          if (iso) {
            return line.replace(iso[1], formatDate(iso[1]));
          }
          return line.replace(/^\d+\.\s*/, "• ");
        });
    }

    return {
      reason: reasonMatch ? reasonMatch[1].replace(/\*+/g, "").trim() : null,
      initiator: initiatorMatch ? initiatorMatch[1].replace(/\*+/g, "").trim() : null,
      references,
    };
  }

  if (!event) {
    return <p style={{ color: '#1f2937', textAlign: 'center' }}>No event selected.</p>;
  }

  const parsed = cleanSummary(why);

  return (
    <div style={{
      width: '100%',
      backgroundColor: '#ffffff', // changed background to white
      color: '#1f2937',           // changed text color to dark
      padding: '2rem',
      borderRadius: '1.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      marginTop: '2rem',
      transition: 'opacity 0.5s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
          {event.title}
        </h2>
        <button
          onClick={onBack}
          style={{
            backgroundColor: '#e5e7eb',
            color: '#1f2937',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.75rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            fontWeight: '600'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
        >
          ⬅ Back
        </button>
      </div>

      <p style={{ marginBottom: '1rem', fontSize: '1rem' }}>
        <strong style={{ color: '#6b7280' }}>Date:</strong>{" "}
        {event?.startDate ? formatDate(event.startDate) : "N/A"}
      </p>

      <div style={{ marginBottom: '2rem' }}>
        {parsed ? (
          <div>
            {parsed.reason && (
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#6b7280' }}>Reason:</strong> {parsed.reason}
              </p>
            )}
            {parsed.initiator && (
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#6b7280' }}>Initiator:</strong> {parsed.initiator}
              </p>
            )}
            {parsed.references.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong style={{ color: '#6b7280' }}>References:</strong>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
                  {parsed.references.map((ref, idx) => (
                    <li key={idx} style={{
                      padding: '0.5rem',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#1f2937'
                    }}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p style={{ fontStyle: 'italic', color: '#6b7280' }}>{why}</p>
        )}
      </div>

      
    </div>
  );
}
