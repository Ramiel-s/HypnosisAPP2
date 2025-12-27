import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 77bb1b89597f225cde547babb33ff2d9af028c76
  createApp(App).use(createPinia()).mount('#app');
});
