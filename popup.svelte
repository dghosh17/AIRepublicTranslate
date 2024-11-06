<script>
  import { onMount } from "svelte";
  let inputText = "";
  let translation = "";
  let targetLang = "Chinese";

  function handleTranslate() {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: inputText, targetLang },
      (response) => {
        translation = response?.translation ?? "Error translating text.";
      }
    );
  }

  function toggleLanguage() {
    targetLang = targetLang === "Chinese" ? "English" : "Chinese";
  }
</script>

<main>
  <h2>AI Republic Translate</h2>
  <textarea bind:value={inputText} placeholder="Enter text to translate"></textarea>
  <button on:click={handleTranslate}>Translate to {targetLang}</button>
  <button on:click={toggleLanguage}>
    Switch to {targetLang === "Chinese" ? "English" : "Chinese"}
  </button>
  <p>Translation: {translation}</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f7f9fc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  }

  button {
    padding: 10px;
    font-size: 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  h2 {
    font-size: 20px;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #555;
  }
</style>
