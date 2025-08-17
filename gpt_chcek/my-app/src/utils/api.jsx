// src/utils/api.js
export const fetchEvents = async (memberId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/events/${memberId}`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};
