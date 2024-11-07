// Listen for mouseup events to detect text selection
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    // Check if a floating widget already exists
    const existingWidget = document.querySelector("#translateWidget");
    if (existingWidget) existingWidget.remove();

    // Create a floating widget icon near the mouse position
    const widget = document.createElement("div");
    widget.id = "translateWidget";
    widget.innerText = "Translate";
    widget.style.cssText = `
      position: absolute;
      top: ${event.pageY + 10}px;
      left: ${event.pageX + 10}px;
      padding: 8px 15px;
      background-color: #007bff;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
      z-index: 10000;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
      transition: transform 0.1s ease;
    `;
    widget.onmouseover = () => widget.style.transform = "scale(1.05)";
    widget.onmouseout = () => widget.style.transform = "scale(1)";
    
    // On click, show the sidebar and remove the widget
    widget.onclick = () => {
      createSidebar(selectedText);
      widget.remove();
    };

    document.body.appendChild(widget);
  }
});

// Function to create the sidebar
function createSidebar(text) {
  // Remove any existing sidebar
  const existingSidebar = document.querySelector("#translateSidebar");
  if (existingSidebar) existingSidebar.remove();

  // Create the sidebar element
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
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-left: 1px solid #ddd;
    font-family: Arial, sans-serif;
  `;

  // Sidebar header
  const header = document.createElement("h3");
  header.innerText = "AI Republic Translate";
  header.style.cssText = `
    font-size: 20px;
    color: #333;
    margin: 0 0 20px;
    text-align: center;
  `;
  sidebar.appendChild(header);

  // Translation button
  const translateButton = document.createElement("button");
  translateButton.innerText = `Translate to Chinese`;
  translateButton.style.cssText = `
    display: block;
    width: 100%;
    padding: 15px;
    margin-top: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.1s ease;
  `;
  translateButton.onmouseover = () => translateButton.style.backgroundColor = "#0056b3";
  translateButton.onmouseout = () => translateButton.style.backgroundColor = "#007bff";
  translateButton.onclick = () => {
    chrome.runtime.sendMessage(
      { type: "TRANSLATE_TEXT", text, targetLang: "Chinese" },
      (response) => {
        alert(response.translation || "No translation available.");
      }
    );
  };
  sidebar.appendChild(translateButton);

  // Close button for the sidebar
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style.cssText = `
    display: block;
    width: 100%;
    padding: 15px;
    margin-top: 15px;
    background-color: #d9534f;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  `;
  closeButton.onmouseover = () => closeButton.style.backgroundColor = "#c9302c";
  closeButton.onmouseout = () => closeButton.style.backgroundColor = "#d9534f";
  closeButton.onclick = () => sidebar.remove();
  sidebar.appendChild(closeButton);

  document.body.appendChild(sidebar);
}
