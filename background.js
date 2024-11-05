// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TRANSLATE_TEXT") {
    const { text, targetLang } = request;
    const apiUrl = "http://localhost:11434";

    // Define the prompt based on the target language
    const prompt = targetLang === "Chinese"
      ? `Translate this English text to Chinese: "${text}"`
      : `Translate this Chinese text to English: "${text}"`;

    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1", // Adjust to the model you're using
        prompt: prompt,
        max_tokens: 100
      })
    };

    fetch(apiUrl, fetchOptions)
      .then(response => response.json())
      .then(data => {
        const translation = data.choices && data.choices[0] ? data.choices[0].text.trim() : "Translation error: Invalid response structure.";
        sendResponse({ translation });
      })
      .catch(error => {
        console.error("Error in translation:", error);
        sendResponse({ translation: "Error translating text." });
      });

    return true; // Keeps the message channel open for async response
  }
});
