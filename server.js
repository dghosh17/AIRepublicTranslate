const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 11434;

app.use(express.json());

app.post('/translate', (req, res) => {
  const { text, targetLang } = req.body;

  // Define the prompt based on target language
  const prompt = targetLang === "Chinese"
    ? `Translate this English text to Chinese: "${text}"`
    : `Translate this Chinese text to English: "${text}"`;

  // Use the command to call Ollama
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

    // Assume stdout contains the translation text
    const translation = stdout.trim();
    res.json({ translation });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
