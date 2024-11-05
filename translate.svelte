<script>
  let text = '';                // User input text
  let targetLang = 'Chinese';    // Target language for translation
  let translation = '';          // Displayed translation result

  // Function to send the text to the local API for translation
  async function translateText() {
    try {
      const apiUrl = "http://localhost:11434";
      const prompt = targetLang === "Chinese"
        ? `Translate this English text to Chinese: "${text}"`
        : `Translate this Chinese text to English: "${text}"`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "mistral:instruct",
          prompt: prompt,
          max_tokens: 100
        })
      });

      const data = await response.json();
      translation = data.choices && data.choices[0] ? data.choices[0].text.trim() : "Translation error: Invalid response structure.";
    } catch (error) {
      console.error("Translation error:", error);
      translation = "Error translating text.";
    }
  }
</script>

<main>
  <h1>Text Translator</h1>
  <textarea bind:value={text} placeholder="Enter text to translate..."></textarea>
  <select bind:value={targetLang}>
    <option value="Chinese">English to Chinese</option>
    <option value="English">Chinese to English</option>
  </select>
  <button on:click={translateText}>Translate</button>
  {#if translation}
    <h2>Translation:</h2>
    <p>{translation}</p>
  {/if}
</main>

<style>
  main {
    padding: 20px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    font-size: 14px;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  select, button {
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  h2, p {
    font-size: 16px;
    margin: 0;
  }
</style>
