function createSidebar() {
  if (document.querySelector("#translateSidebar")) return; // Prevent duplicate sidebar

  const sidebar = document.createElement("div");
  sidebar.id = "translateSidebar";
  sidebar.classList.add("sidebar-container"); // Use class from style.css

  const header = document.createElement("div");
  header.classList.add("sidebar-header");
  header.innerText = "Translation Sidebar";

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.classList.add("sidebar-close-button"); // Use class from style.css
  closeButton.onclick = () => sidebar.remove();

  sidebar.appendChild(header);
  sidebar.appendChild(content);
  sidebar.appendChild(closeButton);
  document.body.appendChild(sidebar);
}

createSidebar();
