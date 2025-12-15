import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- DeepL 翻譯 ---------------- */
app.post("/api/translate", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ text });

  try {
    const params = new URLSearchParams({
      auth_key: process.env.DEEPL_API_KEY,
      text,
      target_lang: "ZH"
    });

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();
    res.json({ text: data.translations[0].text });

  } catch (err) {
    console.error("DeepL error", err);
    res.status(500).json({ text });
  }
});

/* ---------------- 啟動 server ---------------- */
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
