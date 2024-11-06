document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  if (selectedText) {
    const existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    import(chrome.runtime.getURL("sidebar.js")).then(module => {
      const Sidebar = module.default;
      new Sidebar({
        target: document.body,
        props: { selectedText }
      });
    });
  }
});
