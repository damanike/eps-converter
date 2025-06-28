const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

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

app.listen(3000, () => {
  console.log("EPS Converter running on port 3000");
});
