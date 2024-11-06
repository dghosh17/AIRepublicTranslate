function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.id = "translateSidebar";
  sidebar.style = `
    position: fixed;
    right: 0;
    top: 0;
    width: 340px;
    height: 100vh;
    background-color: #ffffff;
    z-index: 10000;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.15);
    border-left: 1px solid #e0e0e0;
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #333;
    display: flex;
    flex-direction: column;
  `;

  // Create header for the sidebar
  const header = document.createElement("div");
  header.style = `
    padding: 16px;
    font-weight: bold;
    font-size: 16px;
    color: #222;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  `;
  header.innerText = "Translation Sidebar";

  // Create content area
  const content = document.createElement("div");
  content.style = `
    padding: 16px;
    flex-grow: 1;
    overflow-y: auto;
  `;
  content.innerHTML = "<p>Translation Sidebar Loaded Successfully</p>";

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.style = `
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    margin: 16px;
    border-radius: 4px;
    align-self: flex-end;
    transition: background-color 0.3s ease;
  `;
  closeButton.onmouseover = () => (closeButton.style.backgroundColor = "#d9363e");
  closeButton.onmouseout = () => (closeButton.style.backgroundColor = "#ff4d4f");
  closeButton.onclick = () => sidebar.remove();

  // Append header, content, and button to sidebar
  sidebar.appendChild(header);
  sidebar.appendChild(content);
  sidebar.appendChild(closeButton);

  // Append sidebar to the document body
  document.body.appendChild(sidebar);
}

// Call the createSidebar function to load the sidebar
createSidebar();
