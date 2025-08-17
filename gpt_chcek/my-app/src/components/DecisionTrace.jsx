import React from "react";

export default function DecisionTrace({ parsedWhy }) {
  if (!parsedWhy) return null;

  return (
    <div className="p-4 border rounded-lg shadow bg-gray-50 mt-4">
      <h3 className="text-lg font-semibold mb-2">Decision Trace</h3>
      <p><strong>Reason:</strong> {parsedWhy.reason || "Not specified"}</p>
      <p><strong>Initiator:</strong> {parsedWhy.initiator || "Unknown"}</p>
      <div>
        <strong>References:</strong>
        <ul className="list-disc ml-6">
          {parsedWhy.references?.length > 0 ? (
            parsedWhy.references.map((ref, idx) => <li key={idx}>{ref}</li>)
          ) : (
            <li>No references found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
