// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "TRANSLATE_TEXT") {
      const text = request.text; // Text to be translated
      const targetLang = request.targetLang; // Target language
      
      // Ollama API URL - assuming it listens on this port locally.
      const apiUrl = "http://localhost:11434"
  
      // Define the prompt based on target language
      const prompt = targetLang === "Chinese"
        ? `Translate this English text to Chinese: "${text}"`
        : `Translate this Chinese text to English: "${text}"`;
  
      // Define the fetch options based on Ollama's API requirements
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral:instruct", // Adjust based on the model you pulled
          prompt: prompt,
          max_tokens: 100
        })
      };
  
      fetch(apiUrl, fetchOptions)
        .then(response => response.json())
        .then(data => {
          const translation = data.choices[0].text.trim(); // Adjust if response structure is different
          sendResponse({ translation });
        })
        .catch(error => {
          console.error("Error in translation:", error);
          sendResponse({ translation: "Error translating text." });
        });
  
      return true; // Keeps the message channel open for async response
    }
  });
  