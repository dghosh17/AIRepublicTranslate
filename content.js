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

    document.body.appendChild(sidebar);

    // Load sidebar.js (the compiled Sidebar.svelte component)
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('sidebar.js');
    document.body.appendChild(script);
  }
});
