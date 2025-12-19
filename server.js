import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;
const OWNER = "DevKittyJS";
const REPO = "API";
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

function ghFetch(url) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "User-Agent": "DevKittyBackend"
    }
  }).then(async r => {
    const data = await r.json();
    if (!r.ok) {
      console.error("[GitHub API Error]", data);
      throw new Error(data.message || "GitHub API error");
    }
    return data;
  });
}

/* ================= ICONS ================= */
app.get("/api/icons/:folder", async (req, res) => {
  try {
    const data = await ghFetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/icons/${req.params.folder}`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= LOADERS ================= */
app.get("/api/loaders", async (req, res) => {
  try {
    const data = await ghFetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/ldscr`
    );
    res.json(data.filter(f => f.type === "dir").map(f => f.name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= TEST ================= */
app.get("/api/test", (req, res) => {
  res.json({
    ok: true,
    message: "API is reachable",
    secretLoaded: Boolean(process.env.API_KEY)
  });
});

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`✅ Backend running on ${PORT}`);
  console.log("🔐 Secret loaded:", Boolean(API_KEY));
});
