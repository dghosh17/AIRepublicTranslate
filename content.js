// Helper function to log errors
function logError(message) {
  console.error(`Translate Extension Error: ${message}`);
}

// Function to create and display the floating "Translate" button
function showTranslateButton(text, x, y) {
  try {
    const existingButton = document.querySelector("#floatingTranslateButton");
    if (existingButton) existingButton.remove();

    const button = document.createElement("button");
    button.id = "floatingTranslateButton";
    button.innerText = "Translate";
    button.style.cssText = `
      position: absolute;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 8px;
      cursor: pointer;
      z-index: 10000;
      left: ${x}px;
      top: ${y}px;
    `;

    button.onclick = () => {
      openSidebarWithText(text);
      button.remove();
    };

    document.body.appendChild(button);
  } catch (error) {
    logError("Failed to show Translate button: " + error.message);
  }
}

// Function to open the sidebar and populate the text box
function openSidebarWithText(text) {
  try {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    const sidebar = document.createElement("div");
    sidebar.id = "translateSidebar";
    sidebar.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 320px;
      height: 100vh;
      background-color: #f9f9f9;
      z-index: 10000;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      padding: 15px;
      font-family: Arial, sans-serif;
    `;

    const inputTextBox = document.createElement("textarea");
    inputTextBox.value = text;
    inputTextBox.style.cssText = `
      width: 100%;
      height: 100px;
      margin-bottom: 10px;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    `;

    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate";
    translateButton.style.cssText = `
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    translateButton.onclick = () => {
      const targetLanguage = toggleLanguageButton.innerText.includes("Chinese") ? "Chinese" : "English";
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: inputTextBox.value, targetLang: targetLanguage },
        (response) => {
          if (chrome.runtime.lastError) {
            logError("Error: " + chrome.runtime.lastError.message);
          } else {
            alert(response.translation || "Translation not available.");
          }
        }
      );
    };

    const toggleLanguageButton = document.createElement("button");
    toggleLanguageButton.innerText = "Switch to Chinese";
    toggleLanguageButton.style.cssText = `
      width: 100%;
      padding: 8px;
      margin-top: 10px;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    toggleLanguageButton.onclick = () => {
      const isChinese = toggleLanguageButton.innerText.includes("Chinese");
      toggleLanguageButton.innerText = isChinese ? "Switch to English" : "Switch to Chinese";
    };

    sidebar.appendChild(inputTextBox);
    sidebar.appendChild(translateButton);
    sidebar.appendChild(toggleLanguageButton);
    document.body.appendChild(sidebar);
  } catch (error) {
    logError("Failed to open sidebar: " + error.message);
  }
}

// Event listener for text selection
document.addEventListener("mouseup", () => {
  try {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const selectedText = selection.toString().trim();
      if (selectedText) {
        const selectionRange = selection.getRangeAt(0).getBoundingClientRect();
        const { x, y } = selectionRange;
        showTranslateButton(selectedText, x + window.scrollX, y + window.scrollY + 20);
      }
    }
  } catch (error) {
    logError("Error handling text selection: " + error.message);
  }
});

// Remove the floating button on click elsewhere
document.addEventListener("click", (event) => {
  const button = document.querySelector("#floatingTranslateButton");
  if (button && !button.contains(event.target)) {
    button.remove();
  }
});

// Log successful script load
console.log("Translate extension script loaded.");
