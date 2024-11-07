// Function to creat// Function to create and display the floating "Translate" button
function showTranslateButton(text, x, y) {
  // Remove any existing button first
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
    border-radius: 6px;
    padding: 10px 12px;
    cursor: pointer;
    z-index: 10000;
    font-size: 15px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, transform 0.2s;
    left: ${x}px;
    top: ${y}px;
  `;

  button.onmouseover = () => {
    button.style.backgroundColor = "#0056b3";
    button.style.transform = "scale(1.05)";
  };
  button.onmouseout = () => {
    button.style.backgroundColor = "#007bff";
    button.style.transform = "scale(1)";
  };

  button.onclick = () => {
    openSidebarWithText(text);
    button.remove();
  };

  document.body.appendChild(button);
}

// Function to open the sidebar and populate the text box with selected text
function openSidebarWithText(text) {
  // Remove existing sidebar if any
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) existingSidebar.remove();

  // Create sidebar
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
    box-shadow: -3px 0 8px rgba(0, 0, 0, 0.15);
    padding: 20px;
    border-left: 1px solid #ddd;
    font-family: 'Andante', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
  `;

  // Input text box with highlighted text
  const inputTextBox = document.createElement("textarea");
  inputTextBox.value = text; // Populate with selected text
  inputTextBox.style.cssText = `
    width: 100%;
    height: 120px;
    padding: 12px;
    font-size: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    resize: none;
    font-family: 'Andante', sans-serif;
    box-sizing: border-box;
  `;

  // Translate button in the sidebar
  const translateButton = document.createElement("button");
  translateButton.innerText = "Translate";
  translateButton.style.cssText = `
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease, transform 0.2s;
  `;
  
  translateButton.onmouseover = () => {
    translateButton.style.backgroundColor = "#0056b3";
    translateButton.style.transform = "scale(1.05)";
  };
  translateButton.onmouseout = () => {
    translateButton.style.backgroundColor = "#007bff";
    translateButton.style.transform = "scale(1)";
  };

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
}

// Event listener for text selection
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText) {
    const { x, y } = window.getSelection().getRangeAt(0).getBoundingClientRect();
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
