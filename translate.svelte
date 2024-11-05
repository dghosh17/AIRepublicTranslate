<script>
  let text = '';
  let targetLang = 'Chinese';
  let translation = '';

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
