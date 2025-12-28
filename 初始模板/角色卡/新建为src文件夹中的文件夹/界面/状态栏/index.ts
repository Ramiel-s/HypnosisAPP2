import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 4ac7bf5d47e725f28c4278aa1dbabc21eb9be37e
  createApp(App).use(createPinia()).mount('#app');
});
