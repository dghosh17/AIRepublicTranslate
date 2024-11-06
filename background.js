chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TRANSLATE_TEXT") {
    const { text, targetLang } = request;
    const apiUrl = "http://localhost:11434/translate";

    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang })
    })
      .then(response => response.ok ? response.json() : Promise.reject(`Error: ${response.status}`))
      .then(data => sendResponse({ translation: data.translation || "Error translating text." }))
      .catch(error => sendResponse({ translation: "Error translating text." }));

    return true; // Keeps the message channel open for async response
  }
});
