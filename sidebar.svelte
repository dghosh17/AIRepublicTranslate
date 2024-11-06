<script>
    export let text = ""; // Prop to receive the selected text from content.js
    let translation = "Translation will appear here"; // Placeholder translation text
  
    // Function to close sidebar
    function closeSidebar() {
      const sidebarElement = document.getElementById("translateSidebar");
      if (sidebarElement) sidebarElement.remove();
    }
  
    // Function to handle translation (simulates interaction with background.js)
    function handleTranslate() {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text, targetLang: "Chinese" },
        (response) => {
          translation = response?.translation || "Error translating text.";
        }
      );
    }
  </script>
  
  <style>
    /* Scoped styling for the sidebar */
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
      font-size: 14px;
      color: #333;
      display: flex;
      flex-direction: column;
    }
  
    .header {
      padding: 16px;
      font-weight: bold;
      font-size: 16px;
      color: #222;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
  
    .content {
      padding: 16px;
      flex-grow: 1;
      overflow-y: auto;
    }
  
    .close-button {
      background-color: #ff4d4f;
      color: #fff;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      margin: 16px;
      border-radius: 4px;
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
      <p>{translation}</p>
    </div>
    <button class="close-button" on:click={closeSidebar}>Close</button>
  </div>
  