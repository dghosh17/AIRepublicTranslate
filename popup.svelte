<script>
    import { onMount } from "svelte";
    let inputText = "";
    let translation = "";
    let targetLang = "Chinese";
  
    function handleTranslate() {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: inputText, targetLang },
        (response) => {
          translation = response.translation;
        }
      );
    }
  </script>
  
  <main>
    <h2>AI Republic Translate</h2>
    <textarea bind:value={inputText} placeholder="Enter text to translate"></textarea>
    <button on:click={handleTranslate}>Translate to {targetLang}</button>
    <button on:click={() => targetLang = targetLang === "Chinese" ? "English" : "Chinese"}>
      Switch to {targetLang === "Chinese" ? "English" : "Chinese"}
    </button>
    <p>Translation: {translation}</p>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
    }
    textarea {
      width: 100%;
      height: 80px;
    }
    button, select {
      margin-top: 5px;
    }
  </style>
  