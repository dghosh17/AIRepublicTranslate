document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString().trim();

  // Check if there is selected text
  if (selectedText) {
    // Remove any existing sidebar to avoid duplicates
    let existingSidebar = document.querySelector("#translateSidebar");
    if (existingSidebar) existingSidebar.remove();

    // Create the sidebar for translation
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

    // Create translate button
    const translateButton = document.createElement("button");
    translateButton.innerText = "Translate";

    // Define the translate function
    translateButton.onclick = () => {
      try {
        chrome.runtime.sendMessage(
          { type: "TRANSLATE_TEXT", text: selectedText, targetLang: "Chinese" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Message error:", chrome.runtime.lastError.message);
              alert("Translation error: Please try again.");
              return;
            }
            alert(response.translation || "No translation available.");
          }
        );
      } catch (error) {
        console.error("Error during translation:", error);
      }
    };

    sidebar.appendChild(translateButton);
    document.body.appendChild(sidebar);

    // Optional: Remove the sidebar if the user clicks outside it
    document.addEventListener("click", (event) => {
      if (!sidebar.contains(event.target)) {
        sidebar.remove();
      }
    });
  }
});
