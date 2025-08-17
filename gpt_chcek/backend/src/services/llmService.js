import fetch from "node-fetch";

export async function askLLM(messages, temperature = 0.2) {
  if (process.env.LLM_PROVIDER === "groq") {
    return askGroq(messages, temperature);
  } else {
    throw new Error("Only Groq supported in this setup");
  }
}

async function askGroq(messages, temperature) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages,
      temperature
    })
  });

  if (!res.ok) throw new Error(`Groq API error: ${res.statusText}`);
  const data = await res.json();
  return data.choices[0].message.content;
}
