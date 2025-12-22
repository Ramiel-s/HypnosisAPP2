import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 716752b8f21fc75a91a1604ff7eb277d5de3327e
  createApp(App).use(createPinia()).mount('#app');
});
