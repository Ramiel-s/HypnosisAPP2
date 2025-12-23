import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> fa6f61d75970bed3668f8d9d1d044052890e077a
  createApp(App).use(createPinia()).mount('#app');
});
