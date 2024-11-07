// Create a floating button to open the sidebar
const openSidebarButton = document.createElement("button");
openSidebarButton.id = "openSidebarButton";
openSidebarButton.innerText = "Translate";
openSidebarButton.style.cssText = `
  position: fixed;
  right: 20px;
  bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  z-index: 10001;
  transition: background-color 0.3s ease;
`;

openSidebarButton.onmouseover = () => openSidebarButton.style.backgroundColor = "#0056b3";
openSidebarButton.onmouseout = () => openSidebarButton.style.backgroundColor = "#007bff";

// Append the button to the document body
document.body.appendChild(openSidebarButton);

// Function to handle button hover
function handleHover(button, hoverColor, originalColor) {
  button.onmouseover = () => (button.style.backgroundColor = hoverColor);
  button.onmouseout = () => (button.style.backgroundColor = originalColor);
}

// Create sidebar and translation buttons when the floating button is clicked
openSidebarButton.onclick = () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove(); // Remove any existing sidebar

    // Create sidebar
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
    `;

    // Create header with larger title
    const header = document.createElement("h1");
    header.innerText = "AI Republic Translate";
    header.style.cssText = `
      font-size: 24px;
      margin: 0 0 10px;
      color: #333;
    `;
    sidebar.appendChild(header);

    // Button styles
    const buttonStyle = `
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

    // Create Translate to Chinese button
    const translateToChineseButton = document.createElement("button");
    translateToChineseButton.innerText = "Translate to Chinese";
    translateToChineseButton.style.cssText = buttonStyle;
    handleHover(translateToChineseButton, "#0056b3", "#007bff");
    translateToChineseButton.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
        (response) => {
          alert(response.translation || "No translation available.");
        }
      );
    };
    sidebar.appendChild(translateToChineseButton);

    // Create Translate to English button
    const translateToEnglishButton = document.createElement("button");
    translateToEnglishButton.innerText = "Translate to English";
    translateToEnglishButton.style.cssText = buttonStyle;
    handleHover(translateToEnglishButton, "#0056b3", "#007bff");
    translateToEnglishButton.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "English" },
        (response) => {
          alert(response.translation || "No translation available.");
        }
      );
    };
    sidebar.appendChild(translateToEnglishButton);

    // Append sidebar to body
    document.body.appendChild(sidebar);
  }
};
