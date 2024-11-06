document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    // Remove existing sidebar to prevent duplicates
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    // Dynamically import Sidebar.svelte component compiled as sidebar.js
    import(chrome.runtime.getURL('sidebar.js')).then((module) => {
      const Sidebar = module.default;
      new Sidebar({
        target: document.body,
        props: { text: selectedText }
      });
    });
  }
});
