// Function to create and show the translation button next to the selected text
const showTranslationButton = () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    // Remove any existing translation button
    const existingButton = document.querySelector("#openSidebarButton");
    if (existingButton) existingButton.remove();

    // Get the position of the selected text
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Create the translation button
    const button = document.createElement("button");
    button.id = "openSidebarButton";
    button.innerText = "Translate";
    button.style.cssText = `
      position: absolute;
      top: ${rect.top + window.scrollY + rect.height + 10}px;
      left: ${rect.left + window.scrollX + 10}px;
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
    button.onmouseover = () => button.style.backgroundColor = "#0056b3";
    button.onmouseout = () => button.style.backgroundColor = "#007bff";

    // Append the button to the body
    document.body.appendChild(button);

    // Handle button click to show the sidebar
    button.onclick = (event) => {
      event.stopPropagation();  // Prevent the click from closing the sidebar

      // Remove any existing sidebar
      const existingSidebar = document.querySelector("#translateSidebar");
      if (existingSidebar) existingSidebar.remove();

      // Create the sidebar
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

      // Create header with large title
      const header = document.createElement("h2");
      header.innerText = "AI Republic Translate";
      header.style.cssText = `
        font-size: 22px;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
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

      // Append the sidebar to the body
      document.body.appendChild(sidebar);

      // Function to close sidebar on outside click
      const closeSidebarOnClickOutside = (event) => {
        const isClickInside = sidebar.contains(event.target) || button.contains(event.target);
        if (!isClickInside) {
          sidebar.remove();
          button.remove();
          document.removeEventListener("click", closeSidebarOnClickOutside); // Remove listener after closing
        }
      };

      // Add event listener to close sidebar on outside click
      document.addEventListener("click", closeSidebarOnClickOutside);
    };
  }
};

// Listen for text selection and display the button
document.addEventListener("mouseup", showTranslationButton);
