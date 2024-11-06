<script>
  import { onMount } from "svelte";

  let inputText = "";          // User input text
  let translation = "";         // Translated text display
  let targetLang = "Chinese";   // Default target language

  function handleTranslate() {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: inputText, targetLang },
      response => {
        translation = response.translation || "Error translating text.";
      }
    );
  }

  function toggleLanguage() {
    targetLang = targetLang === "Chinese" ? "English" : "Chinese";
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    font-family: Arial, sans-serif;
  }

  textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    font-size: 14px;
    resize: none;
  }

  button {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #333;
  }
</style>

<main>
  <h2>AI Republic Translate</h2>
  <textarea bind:value={inputText} placeholder="Enter text to translate"></textarea>
  <button on:click={handleTranslate}>Translate to {targetLang}</button>
  <button on:click={toggleLanguage}>
    Switch to {targetLang === "Chinese" ? "English" : "Chinese"}
  </button>
  <p><strong>Translation:</strong> {translation}</p>
</main>
