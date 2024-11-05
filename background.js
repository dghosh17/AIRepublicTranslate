chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TRANSLATE_TEXT") {
    const { text, targetLang } = request;
    const apiUrl = "http://localhost:11434/translate";

    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang })
    };

    console.log("Sending request to local server with options:", fetchOptions);

    fetch(apiUrl, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const translation = data.translation || "Error translating text.";
        sendResponse({ translation });
      })
      .catch(error => {
        console.error("Error in translation:", error);
        sendResponse({ translation: "Error translating text." });
      });

    return true; // Keeps the message channel open for async response
  }
});
