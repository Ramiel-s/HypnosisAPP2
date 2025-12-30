import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 91f45eafe3411b189964b27942e50d96f7d02445
  createApp(App).use(createPinia()).mount('#app');
});
