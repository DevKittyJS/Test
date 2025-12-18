import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ test API endpoint
app.get("/api/secret-test", (req, res) => {
  res.json({
    ok: true,
    message: "THE API Exists",
    secretLoaded: Boolean(process.env.API_KEY)
  });
});

// SPA fallback (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("🔐 Secret present:", Boolean(process.env.API_KEY));
});
