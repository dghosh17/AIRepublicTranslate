const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 11434;

app.use(express.json());
app.use(cors());

// Serve JavaScript files with correct MIME type
app.use('/js', express.static(path.join(__dirname, 'path-to-js-files'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.post('/translate', (req, res) => {
  const { text, targetLang } = req.body;
  const prompt = targetLang === "Chinese"
    ? `Translate this English text to Chinese: "${text}"`
    : `Translate this Chinese text to English: "${text}"`;

  const command = `ollama generate llama3.1 --prompt "${prompt}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ translation: "Error translating text." });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ translation: "Error translating text." });
    }

    const translation = stdout.trim();
    res.json({ translation });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
