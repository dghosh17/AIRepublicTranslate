<script>
  let text = "Sample text";
  let translation = "Translation will appear here";
</script>

<main>
  <h1>Text Translator</h1>
  <textarea bind:value={text} placeholder="Enter text to translate..."></textarea>
  <button on:click={() => translation = "This is a test translation"}>Translate</button>
  <h2>Translation:</h2>
  <p>{translation}</p>
</main>

<style>
  /* Debugging styles */
  main {
    padding: 20px;
    font-family: Arial, sans-serif;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    width: 300px;
    height: 300px;
  }

  h1 {
    font-size: 18px;
    color: #333;
    margin: 0 0 10px;
  }

  textarea {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  h2 {
    font-size: 16px;
    color: #333;
    margin: 10px 0 5px;
  }

  p {
    font-size: 14px;
    color: #555;
  }
</style>
