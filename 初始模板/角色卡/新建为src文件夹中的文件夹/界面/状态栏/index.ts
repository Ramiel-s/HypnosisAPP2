import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 6750c9a8961718a9d3a32b787ee7d4012d452c3c
  createApp(App).use(createPinia()).mount('#app');
});
