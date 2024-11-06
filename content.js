document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  if (!selectedText) return; // Exit if no text is selected

  // Check and remove existing sidebar if necessary
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) existingSidebar.remove();

  // Create new sidebar
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

  // Translate button
  const translateButton = document.createElement("button");
  translateButton.innerText = "Translate";
  translateButton.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
      (response) => {
        alert(response.translation || "No translation available.");
      }
    );
  };

  sidebar.appendChild(translateButton);
  document.body.appendChild(sidebar);

  // Load `sidebar.js` if accessible
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("sidebar.js");
  document.body.appendChild(script);
});
