// Function to create the floating widget
function createFloatingWidget(selectedText) {
  // Remove any existing floating widget
  const existingWidget = document.querySelector("#translateWidget");
  if (existingWidget) existingWidget.remove();

  // Create the floating widget
  const widget = document.createElement("div");
  widget.id = "translateWidget";
  widget.style = `
    position: absolute;
    left: ${window.event.pageX + 10}px;
    top: ${window.event.pageY + 10}px;
    padding: 5px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    z-index: 10000;
  `;
  widget.innerText = "Translate";

  // On click, toggle to sidebar and remove the floating widget
  widget.onclick = () => {
    toggleSidebar(selectedText);
    widget.remove();
  };

  document.body.appendChild(widget);
}

// Function to create the sidebar
function createSidebar(selectedText) {
  // Remove any existing sidebar
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) existingSidebar.remove();

  // Create the sidebar
  const sidebar = document.createElement("div");
  sidebar.id = "translateSidebar";
  sidebar.style = `
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    height: 100vh;
    background-color: #f9f9f9;
    z-index: 10000;
    box-shadow: -2px 0px 5px rgba(0,0,0,0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
  `;

  const title = document.createElement("h2");
  title.innerText = "AI Republic Translate";

  const translationBox = document.createElement("div");
  translationBox.style = "margin-top: 10px; color: #333;";
  translationBox.innerText = "Translation will appear here.";

  const translateButton = document.createElement("button");
  translateButton.innerText = "Translate to Chinese";
  translateButton.style = "margin-top: 10px;";
  translateButton.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
      (response) => {
        translationBox.innerText = response.translation || "No translation available.";
      }
    );
  };

  const toggleLanguageButton = document.createElement("button");
  toggleLanguageButton.innerText = "Switch to English";
  toggleLanguageButton.style = "margin-top: 10px;";
  toggleLanguageButton.onclick = () => {
    const targetLang = toggleLanguageButton.innerText.includes("English") ? "English" : "Chinese";
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: selectedText, targetLang },
      (response) => {
        translationBox.innerText = response.translation || "No translation available.";
      }
    );
    toggleLanguageButton.innerText = `Switch to ${targetLang === "Chinese" ? "English" : "Chinese"}`;
    translateButton.innerText = `Translate to ${targetLang === "Chinese" ? "Chinese" : "English"}`;
  };

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close Sidebar";
  closeButton.style = "margin-top: 10px;";
  closeButton.onclick = () => sidebar.remove();

  const switchToWidgetButton = document.createElement("button");
  switchToWidgetButton.innerText = "Switch to Widget";
  switchToWidgetButton.style = "margin-top: 10px;";
  switchToWidgetButton.onclick = () => {
    sidebar.remove();
    createFloatingWidget(selectedText);
  };

  // Append elements to the sidebar
  sidebar.appendChild(title);
  sidebar.appendChild(translateButton);
  sidebar.appendChild(toggleLanguageButton);
  sidebar.appendChild(switchToWidgetButton);
  sidebar.appendChild(closeButton);
  sidebar.appendChild(translationBox);
  document.body.appendChild(sidebar);
}

// Function to toggle between floating widget and sidebar
function toggleSidebar(selectedText) {
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) {
    existingSidebar.remove();
  } else {
    createSidebar(selectedText);
  }
}

// Event listener for text selection
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    createFloatingWidget(selectedText);
  }
});
