import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/api/secret-test", (req, res) => {
  const apiKey = process.env.API_KEY;

  console.log("✅ SECRET FROM ENV:", apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: "API_KEY not set" });
  }

  res.json({
    success: true,
    message: "Secret is working (check server console)"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

