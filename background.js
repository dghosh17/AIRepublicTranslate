chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "TRANSLATE_TEXT") {
      const text = request.text; // Text to be translated
      const targetLang = request.targetLang; // Target language
  
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const apiKey = "YOUR_SECURE_API_KEY"; // Replace with your API key securely
  
      // Construct the prompt for translation based on the target language
      const prompt =
        targetLang === "Chinese"
          ? `Translate this English text to Chinese: "${text}"`
          : `Translate this Chinese text to English: "${text}"`;
  
      // Define fetch options
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100
        })
      };
  
      fetch(apiUrl, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
          const translation = data.choices[0].message.content.trim();
          sendResponse({ translation });
        })
        .catch((error) => {
          console.error("Error in translation:", error);
          sendResponse({ translation: "Error translating text." });
        });
  
      return true; // Keep the message channel open for async response
    }
  });
  