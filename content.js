document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    const sidebar = document.createElement("div");
    sidebar.id = "translateSidebar";
    sidebar.style.cssText = `
      font-family: 'Andante', sans-serif;
      position: fixed;
      right: 0;
      top: 0;
      width: 320px;
      height: 100vh;
      background-color: #f8f9fa;
      color: #333;
      z-index: 10000;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
      padding: 15px;
      border-left: 1px solid #ddd;
    `;

    const title = document.createElement("h2");
    title.innerText = "AI Republic Translate";
    title.style.cssText = "font-size: 20px; color: #333; margin-bottom: 15px;";

    const inputArea = document.createElement("textarea");
    inputArea.placeholder = "Type text to translate...";
    inputArea.style.cssText = `
      width: 100%;
      height: 80px;
      padding: 8px;
      font-size: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
      margin-bottom: 10px;
    `;

    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate to Chinese";
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
    translateButton.onmouseover = () => (translateButton.style.backgroundColor = "#0056b3");
    translateButton.onmouseout = () => (translateButton.style.backgroundColor = "#007bff");

    translateButton.onclick = () => {
      const textToTranslate = inputArea.value || selectedText;
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: textToTranslate, targetLang: "Chinese" },
        (response) => {
          alert(response.translation || "No translation available.");
        }
      );
    };

    const switchButton = document.createElement("button");
    switchButton.innerText = "Switch to English";
    switchButton.style.cssText = translateButton.style.cssText;
    switchButton.onclick = () => {
      translateButton.innerText = translateButton.innerText === "Translate to Chinese"
        ? "Translate to English"
        : "Translate to Chinese";
    };

    sidebar.appendChild(title);
    sidebar.appendChild(inputArea);
    sidebar.appendChild(translateButton);
    sidebar.appendChild(switchButton);

    document.body.appendChild(sidebar);
  }
});
