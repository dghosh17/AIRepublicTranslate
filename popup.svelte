<script>
  let message = "Hello, Svelte!";
</script>

<main>
  <h1>{message}</h1>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    font-family: Arial, sans-serif;
  }

  h1 {
    font-size: 24px;
    color: #333;
  }
</style>
