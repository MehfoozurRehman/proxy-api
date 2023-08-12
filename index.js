const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

app.all("/proxy", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    // Proxy the request to the specified URL
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: req.headers,
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while proxying the request" });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
