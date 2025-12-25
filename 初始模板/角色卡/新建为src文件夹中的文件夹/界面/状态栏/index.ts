import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 170141cb8741287228b58218d6c0f3b5196ecdf6
  createApp(App).use(createPinia()).mount('#app');
});
