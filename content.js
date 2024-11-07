document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  // Remove any existing floating button or sidebar to avoid duplicates
  const existingButton = document.querySelector("#floatingTranslateButton");
  if (existingButton) existingButton.remove();

  if (selectedText) {
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
    `;

    // Position the button near the selected text
    const { x, y } = window.getSelection().getRangeAt(0).getBoundingClientRect();
    button.style.left = `${x + window.scrollX}px`;
    button.style.top = `${y + window.scrollY + 20}px`;

    button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
    button.onmouseout = () => (button.style.backgroundColor = "#007bff");

    // Button click event to open the sidebar with populated text
    button.onclick = () => {
      openSidebarWithText(selectedText);
      button.remove(); // Remove button after clicking to keep UI clean
    };

    document.body.appendChild(button);
  }
});

// Function to open the sidebar and populate the input box with selected text
function openSidebarWithText(text) {
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
    background-color: #ffffff;
    z-index: 10000;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 15px;
    border-left: 1px solid #ddd;
    font-family: 'Andante', sans-serif;
  `;

  // Input text box with selected text
  const inputTextBox = document.createElement("textarea");
  inputTextBox.value = text; // Populate with highlighted text
  inputTextBox.style.cssText = `
    width: 100%;
    height: 100px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  `;

  // Translate button inside the sidebar
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
    transition: background-color 0.3s ease;
  `;
  translateButton.onmouseover = () => translateButton.style.backgroundColor = "#0056b3";
  translateButton.onmouseout = () => translateButton.style.backgroundColor = "#007bff";

  // Send message to background for translation on button click
  translateButton.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: inputTextBox.value, targetLang: "Chinese" },
      (response) => {
        alert(response.translation || "No translation available.");
      }
    );
  };

  sidebar.appendChild(inputTextBox);
  sidebar.appendChild(translateButton);
  document.body.appendChild(sidebar);
}

// Remove the floating button if the user clicks elsewhere
document.addEventListener("click", (event) => {
  const button = document.querySelector("#floatingTranslateButton");
  if (button && !button.contains(event.target)) {
    button.remove();
  }
});
