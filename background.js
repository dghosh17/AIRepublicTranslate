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
        console.log("Received raw response from server:", response);
        return response.json();
      })
      .then(data => {
        console.log("Parsed data from server:", data);
        const translation = data.translation || "Error translating text.";
        console.log("Translation text:", translation);
        sendResponse({ translation });
      })
      .catch(error => {
        console.error("Error in translation:", error);
        sendResponse({ translation: "Error translating text." });
      });

    return true; // Keeps the message channel open for async response
  }
});
