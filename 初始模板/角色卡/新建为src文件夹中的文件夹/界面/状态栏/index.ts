import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 6f04ece0949abf2098513ba3eec65028a25c9b9a
  createApp(App).use(createPinia()).mount('#app');
});
