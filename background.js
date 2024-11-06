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
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return response.json();
    })
    .then(data => sendResponse({ translation: data.translation }))
    .catch(error => {
      console.error("Translation error:", error);
      sendResponse({ translation: "Error translating text." });
    });

    return true; // Keeps the message channel open for async response
  }
});
