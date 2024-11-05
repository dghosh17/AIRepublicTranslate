// content.js
document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText) {
    const existingButton = document.querySelector("#translateButton");
    if (existingButton) existingButton.remove();

    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    const translateButton = document.createElement("div");
    translateButton.id = "translateButton";
    translateButton.textContent = "Translate";
    translateButton.style = `
      position: absolute;
      background: #0073e6;
      color: white;
      padding: 5px;
      cursor: pointer;
      z-index: 1000;
      top: ${rect.top + window.scrollY}px;
      left: ${rect.right + 10}px;
    `;
    
    document.body.appendChild(translateButton);

    translateButton.addEventListener("click", () => {
      chrome.runtime.sendMessage(
        { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
        (response) => {
          if (response && response.translation) {
            alert(`Translation: ${response.translation}`);
          } else {
            alert("Translation error.");
          }
          translateButton.remove();
        }
      );
    });

    document.addEventListener("click", () => translateButton.remove(), { once: true });
  }
});
