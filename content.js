document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    const sidebar = document.createElement("div");
    sidebar.id = "translateSidebar";
    sidebar.style = `
      position: fixed;
      right: 10px;
      top: 50px;
      width: 300px;
      padding: 15px;
      background-color: #ffffff; /* White background */
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      border-left: 5px solid #007bff; /* Accent blue border */
    `;

    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate";
    translateButton.style = `
      background-color: #007bff;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 10px 15px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    `;

    translateButton.onclick = () => {
      chrome.runtime.sendMessage({ type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" }, (response) => {
        alert(response.translation || "No translation available.");
      });
    };

    sidebar.appendChild(translateButton);
    document.body.appendChild(sidebar);
  }
});
