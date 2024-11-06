document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    // Remove any existing sidebar
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    // Dynamically import Sidebar component compiled to sidebar.js
    import(chrome.runtime.getURL("sidebar.js")).then(module => {
      const Sidebar = module.default;
      new Sidebar({
        target: document.body,
        props: { selectedText }
      });
    }).catch(error => console.error("Error loading sidebar module:", error));
  }
});
