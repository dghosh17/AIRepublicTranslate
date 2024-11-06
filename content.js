document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

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
    `;

    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate";
    translateButton.onclick = () => {
      chrome.runtime.sendMessage({ type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" }, (response) => {
        alert(response.translation || "No translation available.");
      });
    };

    sidebar.appendChild(translateButton);
    document.body.appendChild(sidebar);

    // Load sidebar.js (the compiled Sidebar.svelte component)
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('sidebar.js');
    document.body.appendChild(script);
  }
  sidebar.style = `
  position: fixed;
  right: 10px;
  top: 10px;
  width: 250px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 10000;
`;
translateButton.style = `
background-color: #007bff;
color: #fff;
padding: 8px 12px;
border: none;
border-radius: 4px;
font-size: 14px;
cursor: pointer;
transition: background-color 0.3s ease;
`;



});
