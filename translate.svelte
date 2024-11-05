<script>
    let text = '';
    let targetLang = 'Chinese';
    let translation = '';
  
    async function translateText() {
      try {
        // Use the local Ollama API URL (adjust the port if necessary)
        const apiUrl = "http://localhost:11434"; 
        
        // Create the prompt based on the selected target language
        const prompt = targetLang === "Chinese"
          ? `Translate this English text to Chinese: "${text}"`
          : `Translate this Chinese text to English: "${text}"`;
  
        // Fetch the translation from the Ollama API
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "mistral:instruct",  // Update this to your chosen model
            prompt: prompt,
            max_tokens: 100
          })
        });
  
        const data = await response.json();
        // Check for the translation result
        translation = data.translation || "Error translating text."; // Adjust according to the response structure
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
  