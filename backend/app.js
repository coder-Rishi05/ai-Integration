import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
const app = express();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI(process.env.Gemini_API_Key);

app.use(express.json());

app.get("/hi", (req, res) => {
  res.send("Say hello to my ai");
});

app.post("/askAI", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(404).json({ message: "Enter valid string" });
    }

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text;
    }

    const api_response = await main();
    console.log(api_response);
    return res
      .status(201)
      .json({ message: "your response is ready", data: api_response });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
});

app.listen(process.env.port, () => {
  console.log("server running at : ", process.env.port);
});
