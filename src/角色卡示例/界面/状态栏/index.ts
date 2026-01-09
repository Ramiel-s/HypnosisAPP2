<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a17361edcd8bc72f363b2accf0cd15361ec3f8de
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a17361edcd8bc72f363b2accf0cd15361ec3f8de
  createApp(App).use(createPinia()).mount('#app');
});
