// Function to create and show the translation button next to the selected text
const showTranslationButton = () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return;

  document.querySelector("#openSidebarButton")?.remove();

  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();
  const button = document.createElement("button");
  button.id = "openSidebarButton";
  button.textContent = "Translate";
  button.style.cssText = `
    position: absolute;
    top: ${rect.top + window.scrollY}px;
    left: ${rect.right + 10}px;
    padding: 8px 14px;
    background-color: #4A90E2;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    z-index: 10001;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  button.onmouseover = () => button.style.backgroundColor = "#3b7bbf";
  button.onmouseout = () => button.style.backgroundColor = "#4A90E2";

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
    width: 360px;
    height: 100vh;
    background-color: #f9fafc;
    z-index: 10000;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
    padding: 24px;
    border-left: 1px solid #e0e0e0;
    overflow-y: auto;
    font-family: Arial, sans-serif;
  `;

  const header = document.createElement("h2");
  header.textContent = "AI Republic Translate";
  header.style.cssText = `
    font-size: 24px;
    margin-bottom: 16px;
    color: #333;
    font-weight: bold;
    letter-spacing: 0.5px;
  `;
  sidebar.appendChild(header);

  sidebar.appendChild(createTranslationButton("Translate to Chinese", text, "Chinese"));
  sidebar.appendChild(createTranslationButton("Translate to English", text, "English"));

  document.body.appendChild(sidebar);
};

// Utility to create a translation button with updated styles
const createTranslationButton = (label, text, lang) => {
  const button = document.createElement("button");
  button.textContent = label;
  button.style.cssText = `
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    background-color: #4A90E2;
    color: #fff;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s ease;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  `;
  button.onmouseover = () => button.style.backgroundColor = "#3b7bbf";
  button.onmouseout = () => button.style.backgroundColor = "#4A90E2";
  button.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text, targetLang: lang },
      (response) => alert(response.translation || "No translation available.")
    );
  };
  return button;
};

// Close sidebar on outside click
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

document.addEventListener("mouseup", showTranslationButton);
