document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      const translateButton = document.createElement("div");
  
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
            alert(`Translation: ${response.translation}`);
            translateButton.remove();
          }
        );
      });
  
      document.addEventListener("click", () => translateButton.remove(), { once: true });
    }
  });
  