import App from './App.vue';
<<<<<<< HEAD

$(() => {
=======
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
>>>>>>> 51076cdf0ae6bd538c42ff664a04939d09afd915
  createApp(App).use(createPinia()).mount('#app');
});
