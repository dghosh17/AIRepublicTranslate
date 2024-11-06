<!-- popup.svelte -->
<script>
  import { onMount } from "svelte";
  let inputText = "";          // Text entered by the user
  let translation = "";         // Translated text to display
  let targetLang = "Chinese";   // Default target language

  // Function to handle translation
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

  // Function to toggle between English and Chinese
  function toggleLanguage() {
    targetLang = targetLang === "Chinese" ? "English" : "Chinese";
  }
</script>

<main>
  <h2>AI Republic Translate</h2>
  <textarea bind:value={inputText} placeholder="Enter text to translate"></textarea>
  <button on:click={handleTranslate}>Translate to {targetLang}</button>
  <button class="toggle-btn" on:click={toggleLanguage}>
    Switch to {targetLang === "Chinese" ? "English" : "Chinese"}
  </button>
  <p>Translation: {translation}</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: #f8f9fa; /* Light gray background */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif;
    max-width: 400px;
    margin: auto;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ced4da;
    border-radius: 6px;
    background-color: #ffffff; /* White background */
    color: #333;
    resize: vertical;
    outline: none;
    transition: border-color 0.3s;
  }

  textarea:focus {
    border-color: #007bff; /* Focus effect with primary blue */
  }

  button {
    padding: 10px 15px;
    font-size: 14px;
    background-color: #007bff; /* Primary blue */
    color: #ffffff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    background-color: #0056b3; /* Darker blue */
  }

  button:active {
    transform: translateY(1px);
  }

  .toggle-btn {
    background-color: #343a40; /* Dark gray for toggle button */
  }

  .toggle-btn:hover {
    background-color: #1d2124; /* Darker hover */
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #007bff; /* Blue for headings */
  }

  p {
    font-size: 14px;
    color: #333;
    background-color: #ffffff;
    padding: 10px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
</style>
