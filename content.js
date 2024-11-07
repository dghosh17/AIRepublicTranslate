// Function to create and show the translation button next to the selected text
const showTranslationButton = () => {
  const selectedText = window.getSelection().toString().trim();

  // Remove any existing translation button
  const existingButton = document.querySelector("#openSidebarButton");
  if (existingButton) existingButton.remove();

  if (selectedText) {
    // Get the position of the selected text
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Create the button
    const button = document.createElement("button");
    button.id = "openSidebarButton";
    button.innerText = "Translate";
    button.style.cssText = `
      position: absolute;
      top: ${rect.top + window.scrollY + rect.height + 10}px; /* Button below the text */
      left: ${rect.left + window.scrollX + 10}px; /* Button next to the text */
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
    
    // Button hover effect
    button.onmouseover = () => button.style.backgroundColor = "#0056b3";
    button.onmouseout = () => button.style.backgroundColor = "#007bff";

    // Append the button to the body
    document.body.appendChild(button);

    // Handle button click to show the sidebar
    button.onclick = () => {
      console.log("Translate button clicked");

      // Remove any existing sidebar
      const existingSidebar = document.querySelector("#translateSidebar");
      if (existingSidebar) existingSidebar.remove();

      // Create sidebar
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

      // Create header with centered title
      const header = document.createElement("h2");
      header.innerText = "AI Republic Translate";
      header.style.cssText = `
        font-size: 22px;
        text-align: center; /* Center the title */
        margin-bottom: 20px;
        color: #333;
      `;
      sidebar.appendChild(header);

      // Button styles for translation
      const buttonStyle = `
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

      // Create Translate to Chinese button
      const translateToChineseButton = document.createElement("button");
      translateToChineseButton.innerText = "Translate to Chinese";
      translateToChineseButton.style.cssText = buttonStyle;
      translateToChineseButton.onmouseover = () => translateToChineseButton.style.backgroundColor = "#0056b3";
      translateToChineseButton.onmouseout = () => translateToChineseButton.style.backgroundColor = "#007bff";
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
      translateToEnglishButton.onmouseover = () => translateToEnglishButton.style.backgroundColor = "#0056b3";
      translateToEnglishButton.onmouseout = () => translateToEnglishButton.style.backgroundColor = "#007bff";
      translateToEnglishButton.onclick = () => {
        chrome.runtime.sendMessage(
          { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "English" },
          (response) => {
            alert(response.translation || "No translation available.");
          }
        );
      };
      sidebar.appendChild(translateToEnglishButton);

      // Append sidebar to the body
      document.body.appendChild(sidebar);
    };
  }
};

// Close the button when clicking outside
document.addEventListener("click", (event) => {
  const button = document.querySelector("#openSidebarButton");
  if (button && !button.contains(event.target) && !document.querySelector("#translateSidebar")?.contains(event.target)) {
    button.remove();
  }
});

// Listen for text selection and display the button
document.addEventListener("mouseup", showTranslationButton);
