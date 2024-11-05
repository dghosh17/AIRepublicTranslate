chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "TRANSLATE_TEXT") {
      const text = request.text; // Text to be translated
      const targetLang = request.targetLang; // Target language
  
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const apiKey = "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";
  
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
  