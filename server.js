const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

// 🔁 Health check route for Bolt.new / Render
app.get("/", (req, res) => {
  res.send("✅ EPS Converter API is running.");
});

app.post("/convert-eps", upload.single("file"), (req, res) => {
  const inputPath = req.file.path;
  const outputFilename = path.basename(inputPath) + ".jpg";
  const outputPath = path.join("converted", outputFilename);

  fs.mkdirSync("converted", { recursive: true });

  const command = `convert -density 300 ${inputPath} -quality 90 ${outputPath}`;

  exec(command, (err) => {
    if (err) {
      console.error("Conversion error:", err);
      return res.status(500).send("Conversion failed.");
    }
    res.download(outputPath, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EPS Converter running on port ${PORT}`);
});
