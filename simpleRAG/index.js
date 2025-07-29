import OpenAI from "openai";
import 'dotenv/config';

const apiKey = process.env.GROQ_API_KEY;




const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.groq.com/openai/v1"
});

// Mock knowledge base (in a real app, this would be a database or search index)
const knowledgeBase = {
  "thomas edison": "Thomas Edison invented the phonograph in 1877 and the practical electric light bulb in 1879. He held over 1,000 patents.",
  "nikola tesla": "Nikola Tesla developed the alternating current (AC) electrical system in the 1880s. He worked on wireless communication and had over 300 patents.",
  "alexander graham bell": "Alexander Graham Bell invented the telephone in 1876. He also worked on optical telecommunications and aeronautics."
};

function retrieveContext(query) {
  // Simple keyword-based retrieval (improve with embeddings in production)
  const lowerQuery = query.toLowerCase();
  for (const key in knowledgeBase) {
    if (lowerQuery.includes(key)) {
      return knowledgeBase[key];
    }
  }
  return "No relevant information found.";
}

async function generateResponse(query) {
  const context = retrieveContext(query);
  const prompt = `Based on this context: ${context}\n\nUser query: ${query}\n\nProvide a helpful response:`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

// Example usage
(async () => {
  const query = "What did Thomas Edison invent?";
  try {
    const answer = await generateResponse(query);
    console.log(answer);
  } catch (error) {
    console.error("Error:", error);
  }
})();
