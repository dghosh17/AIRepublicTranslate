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
      background-color: #ffffff;
      z-index: 10000;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      padding: 15px;
      border-left: 1px solid #ddd;
    `;

    const header = document.createElement("h3");
    header.innerText = "AI Republic Translate";
    sidebar.appendChild(header);

    const translateToChineseButton = document.createElement("button");
    translateToChineseButton.innerText = "Translate to Chinese";
    translateToChineseButton.style.cssText = `
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
    translateToChineseButton.onmouseover = () => translateToChineseButton.style.backgroundColor = "#0056b3";
    translateToChineseButton.onmouseout = () => translateToChineseButton.style.backgroundColor = "#007bff";
    translateToChineseButton.onclick = () => {
      chrome.runtime.sendMessage({ type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" }, (response) => {
        alert(response.translation || "No translation available.");
      });
    };
    sidebar.appendChild(translateToChineseButton);

    const translateToEnglishButton = document.createElement("button");
    translateToEnglishButton.innerText = "Translate to English";
    translateToEnglishButton.style.cssText = `
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
    translateToEnglishButton.onmouseover = () => translateToEnglishButton.style.backgroundColor = "#0056b3";
    translateToEnglishButton.onmouseout = () => translateToEnglishButton.style.backgroundColor = "#007bff";
    translateToEnglishButton.onclick = () => {
      chrome.runtime.sendMessage({ type: "TRANSLATE_TEXT", text: selectedText, targetLang: "English" }, (response) => {
        alert(response.translation || "No translation available.");
      });
    };
    sidebar.appendChild(translateToEnglishButton);

    document.body.appendChild(sidebar);
  }
});