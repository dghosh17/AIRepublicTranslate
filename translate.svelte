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
  main {
    max-width: 600px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }

  textarea {
    width: 100%;
    margin-bottom: 1rem;
    height: 100px;
  }

  button {
    display: block;
    margin-bottom: 1rem;
  }
</style>
