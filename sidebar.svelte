<script>
    export let selectedText = "";  // Text to translate
    let translation = "";          // Translation result
    let targetLang = "Chinese";    // Default target language
  
    function handleTranslate() {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang },
        response => {
          translation = response.translation || "Error translating text.";
          console.log("Translation response:", response); // Debugging log
        }
      );
    }
  
    function toggleLanguage() {
      targetLang = targetLang === "Chinese" ? "English" : "Chinese";
    }
  
    function closeSidebar() {
      document.getElementById("translateSidebar")?.remove();
    }
  </script>
  
  <style>
    #translateSidebar {
      position: fixed;
      right: 0;
      top: 0;
      width: 340px;
      height: 100vh;
      background-color: #ffffff;
      z-index: 10000;
      box-shadow: -4px 0 10px rgba(0, 0, 0, 0.15);
      border-left: 1px solid #e0e0e0;
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
    }
  
    .header {
      padding: 16px;
      font-weight: bold;
      font-size: 16px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
  
    .content {
      padding: 16px;
      flex-grow: 1;
      overflow-y: auto;
    }
  
    .button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 8px 16px;
      margin: 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .button:hover {
      background-color: #0056b3;
    }
  
    .close-button {
      background-color: #ff4d4f;
      color: #fff;
      padding: 8px 16px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin: 16px;
      align-self: flex-end;
      transition: background-color 0.3s ease;
    }
  
    .close-button:hover {
      background-color: #d9363e;
    }
  </style>
  
  <div id="translateSidebar">
    <div class="header">Translation Sidebar</div>
    <div class="content">
      <p><strong>Original Text:</strong> {selectedText}</p>
      <button class="button" on:click={handleTranslate}>Translate to {targetLang}</button>
      <button class="button" on:click={toggleLanguage}>
        Switch to {targetLang === "Chinese" ? "English" : "Chinese"}
      </button>
      <p><strong>Translation:</strong> {translation}</p>
    </div>
    <button class="close-button" on:click={closeSidebar}>Close</button>
  </div>
  