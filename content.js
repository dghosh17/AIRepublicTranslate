// Function to create and show the translation button next to the selected text
const showTranslationButton = () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  // Remove any existing translation button
  document.querySelector("#openSidebarButton")?.remove();

  // Position the translation button near the selected text
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const button = document.createElement("button");
  button.id = "openSidebarButton";
  button.textContent = "Translate";
  button.style.cssText = `
    position: absolute;
    top: ${rect.top + window.scrollY}px;
    left: ${rect.right + 10}px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    z-index: 10001;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  `;
  button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
  button.onmouseout = () => (button.style.backgroundColor = "#007bff");

  // Append button to the document and handle click to show the sidebar
  document.body.appendChild(button);
  button.onclick = (event) => {
    event.stopPropagation();
    document.querySelector("#translateSidebar")?.remove();
    createSidebar(selectedText);
    addOutsideClickListener(button);
  };
};

// Function to create and display the sidebar with translation options
const createSidebar = (text) => {
  const sidebar = document.createElement("div");
  sidebar.id = "translateSidebar";
  sidebar.style.cssText = `
    position: fixed;
    right: 0;
    top: 0;
    width: 350px;
    height: 100vh;
    background-color: #ffffff;
    z-index: 10000;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-left: 1px solid #ddd;
    overflow-y: auto;
  `;
  
  // Sidebar header
  const header = document.createElement("h2");
  header.textContent = "AI Republic Translate";
  header.style.cssText = `
    font-size: 22px;
    margin-bottom: 20px;
    color: #333;
  `;
  sidebar.appendChild(header);

  // Translation buttons
  sidebar.appendChild(createTranslationButton("Translate to Chinese", text, "Chinese"));
  sidebar.appendChild(createTranslationButton("Translate to English", text, "English"));

  document.body.appendChild(sidebar);
};

// Utility to create a translation button with a callback
const createTranslationButton = (label, text, lang) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.style.cssText = `
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  `;
  button.onmouseover = () => (button.style.backgroundColor = "#0056b3");
  button.onmouseout = () => (button.style.backgroundColor = "#007bff");
  button.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text, targetLang: lang },
      (response) => alert(response.translation || "No translation available.")
    );
  };
  return button;
};

// Close sidebar when clicking outside of it
const addOutsideClickListener = (button) => {
  const closeSidebar = (event) => {
    const sidebar = document.querySelector("#translateSidebar");
    if (!sidebar.contains(event.target) && !button.contains(event.target)) {
      sidebar.remove();
      button.remove();
      document.removeEventListener("click", closeSidebar);
    }
  };
  document.addEventListener("click", closeSidebar);
};

// Listen for text selection to display the translation button
document.addEventListener("mouseup", showTranslationButton);
