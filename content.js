function showTranslationSidebar(selectedText) {
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) existingSidebar.remove();

  // Create the sidebar
  const sidebar = document.createElement("div");
  sidebar.id = "translateSidebar";
  sidebar.style = `
    position: fixed;
    right: 0;
    top: 0;
    width: 320px;
    height: 100vh;
    background-color: #f5f5f7;
    color: #333;
    z-index: 10000;
    box-shadow: -3px 0px 5px rgba(0, 0, 0, 0.15);
    padding: 24px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  // Header text
  const header = document.createElement("h2");
  header.innerText = "Translate Text";
  header.style = `
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  `;

  // Selected text display
  const selectedTextDisplay = document.createElement("p");
  selectedTextDisplay.innerText = `"${selectedText}"`;
  selectedTextDisplay.style = `
    font-size: 16px;
    color: #666;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  `;

  // Translate button
  const translateButton = document.createElement("button");
  translateButton.innerText = "Translate to Chinese";
  translateButton.style = `
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #4A90E2;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s ease;
  `;
  translateButton.onmouseenter = () => {
    translateButton.style.backgroundColor = "#357ABD";
  };
  translateButton.onmouseleave = () => {
    translateButton.style.backgroundColor = "#4A90E2";
  };
  translateButton.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
      (response) => {
        const translation = response.translation || "No translation available.";
        translationDisplay.innerText = translation;
      }
    );
  };

  // Translation display area
  const translationDisplay = document.createElement("p");
  translationDisplay.innerText = "Translation will appear here.";
  translationDisplay.style = `
    font-size: 16px;
    color: #333;
    background-color: #e8f0fe;
    padding: 10px;
    border-radius: 5px;
    box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  `;

  // Append elements to the sidebar
  sidebar.appendChild(header);
  sidebar.appendChild(selectedTextDisplay);
  sidebar.appendChild(translateButton);
  sidebar.appendChild(translationDisplay);

  // Append sidebar to the document
  document.body.appendChild(sidebar);
}
