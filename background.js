chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TRANSLATE_TEXT") {
    const { text, targetLang } = request;
    const apiUrl = "http://localhost:11434/translate";

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Translation result:", data); // Debugging log
        sendResponse({ translation: data.translation || "Error translating text." });
      })
      .catch(error => {
        console.error("Error in translation request:", error); // Error log
        sendResponse({ translation: "Error translating text." });
      });

    return true; // Keeps the message channel open for async response
  }
});
