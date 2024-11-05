<script>
    import { onMount } from 'svelte';
  
    let text = '';
    let targetLang = 'Chinese'; 
    let translation = '';
  
    async function translateText() {
      const apiKey = "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";
      const apiUrl = "https://api.openai.com/v1/chat/completions";
  
      const prompt = targetLang === "Chinese"
        ? `Translate this English text to Chinese: "${text}"`
        : `Translate this Chinese text to English: "${text}"`;
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100
        })
      });
  
      const data = await response.json();
      translation = data.choices[0].message.content.trim();
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
  