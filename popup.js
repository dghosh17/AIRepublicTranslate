import App from './translate.svelte';

const app = new App({
  target: document.getElementById('svelte-root') // Ensures mounting to the correct element
});

export default app;
