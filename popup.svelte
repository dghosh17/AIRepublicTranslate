<script>
  import { onMount } from "svelte";
  let inputText = "";
  let translation = "";
  let targetLang = "Chinese";

  function handleTranslate() {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: inputText, targetLang },
      (response) => {
        if (response && response.translation) {
          translation = response.translation;
        } else {
          translation = "Error translating text.";
        }
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
    background-color: #f0f4f8; /* Sleek white/blue blend */
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    outline: none;
    transition: border 0.3s;
  }

  textarea:focus {
    border: 1px solid #007bff;
  }

  button {
    padding: 10px 15px;
    font-size: 15px;
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

  button:active {
    background-color: #004494;
  }

  h2 {
    font-size: 20px;
    color: #333;
  }

  p {
    font-size: 15px;
    color: #333;
    word-wrap: break-word;
  }
</style>
