import App from './popup.svelte';

const app = new App({
  target: document.getElementById('svelte-root') // Ensure this matches the id in your HTML
});

export default app;
