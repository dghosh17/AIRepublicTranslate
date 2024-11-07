document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
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
      background-color: #f9f9f9;
      z-index: 10000;
      box-shadow: -3px 0 10px rgba(0, 0, 0, 0.15);
      padding: 20px;
      border-left: 1px solid #ccc;
      font-family: Arial, sans-serif;
    `;

    const header = document.createElement("h3");
    header.innerText = "AI Republic Translate";
    header.style.cssText = `
      font-size: 20px;
      color: #333;
      margin: 0 0 20px;
      text-align: center;
    `;
    sidebar.appendChild(header);

    const buttonStyle = `
      display: block;
      width: 100%;
      padding: 12px;
      margin-top: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease, transform 0.1s ease;
    `;

    const translateToChineseButton = document.createElement("button");
    translateToChineseButton.innerText = "Translate to Chinese";
    translateToChineseButton.style.cssText = buttonStyle;
    translateToChineseButton.onmouseover = () => {
      translateToChineseButton.style.backgroundColor = "#0056b3";
      translateToChineseButton.style.transform = "scale(1.02)";
    };
    translateToChineseButton.onmouseout = () => {
      translateToChineseButton.style.backgroundColor = "#007bff";
      translateToChineseButton.style.transform = "scale(1)";
    };
    translateToChineseButton.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
        (response) => {
          alert(response.translation || "No translation available.");
        }
      );
    };
    sidebar.appendChild(translateToChineseButton);

    const translateToEnglishButton = document.createElement("button");
    translateToEnglishButton.innerText = "Translate to English";
    translateToEnglishButton.style.cssText = buttonStyle;
    translateToEnglishButton.onmouseover = () => {
      translateToEnglishButton.style.backgroundColor = "#0056b3";
      translateToEnglishButton.style.transform = "scale(1.02)";
    };
    translateToEnglishButton.onmouseout = () => {
      translateToEnglishButton.style.backgroundColor = "#007bff";
      translateToEnglishButton.style.transform = "scale(1)";
    };
    translateToEnglishButton.onclick = () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "English" },
        (response) => {
          alert(response.translation || "No translation available.");
        }
      );
    };
    sidebar.appendChild(translateToEnglishButton);

    document.body.appendChild(sidebar);
  }
});
