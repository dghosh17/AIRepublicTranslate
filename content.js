// Helper function to log errors and diagnostics
function logError(message) {
  console.error(`Translate Extension Error: ${message}`);
}

// Function to create and display the floating "Translate" button
function showTranslateButton(text, x, y) {
  try {
    // Remove any existing button first to avoid duplicates
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
      font-size: 14px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transition: background-color 0.3s ease;
      left: ${x}px;
      top: ${y}px;
    `;

    button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
    button.onmouseout = () => (button.style.backgroundColor = "#007bff");

    // Open sidebar on click and auto-populate text
    button.onclick = () => {
      openSidebarWithText(text);
      button.remove(); // Ensure button disappears after click
    };

    document.body.appendChild(button);
  } catch (error) {
    logError("Failed to show Translate button: " + error.message);
  }
}

// Function to open the sidebar and populate the text box with selected text
function openSidebarWithText(text) {
  try {
    // Remove existing sidebar to prevent multiple instances
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    // Create sidebar container
    const sidebar = document.createElement("div");
    sidebar.id = "translateSidebar";
    sidebar.style.cssText = `
      position: fixed;
      right: 0;
      top: 0;
      width: 320px;
      height: 100vh;
      background-color: #ffffff;
      z-index: 10000;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      padding: 15px;
      border-left: 1px solid #ddd;
      font-family: 'Andante', sans-serif;
    `;

    // Input text box containing highlighted text
    const inputTextBox = document.createElement("textarea");
    inputTextBox.value = text;
    inputTextBox.style.cssText = `
      width: 100%;
      height: 100px;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: vertical;
    `;

    // Translate button in the sidebar
    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate";
    translateButton.style.cssText = `
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    `;
    
    translateButton.onmouseover = () => (translateButton.style.backgroundColor = "#0056b3");
    translateButton.onmouseout = () => (translateButton.style.backgroundColor = "#007bff");

    translateButton.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: inputTextBox.value, targetLang: "Chinese" },
        (response) => {
          alert(response.translation || "Translation not available.");
        }
      );
    };

    sidebar.appendChild(inputTextBox);
    sidebar.appendChild(translateButton);
    document.body.appendChild(sidebar);
  } catch (error) {
    logError("Failed to open sidebar: " + error.message);
  }
}

// Event listener for text selection to show the Translate button
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const selectionRange = window.getSelection().getRangeAt(0).getBoundingClientRect();
    const { x, y } = selectionRange;
    showTranslateButton(selectedText, x + window.scrollX, y + window.scrollY + 20);
  }
});

// Remove the floating button if the user clicks elsewhere
document.addEventListener("click", (event) => {
  const button = document.querySelector("#floatingTranslateButton");
  if (button && !button.contains(event.target)) {
    button.remove();
  }
});

// Log successful load of the script
console.log("Translate extension loaded. Waiting for user selection.");
