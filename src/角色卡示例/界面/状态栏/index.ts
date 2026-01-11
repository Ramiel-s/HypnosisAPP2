<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4e2a9fc6b9f5ae825823eb357fffa0d0ea284155
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4e2a9fc6b9f5ae825823eb357fffa0d0ea284155
  createApp(App).use(createPinia()).mount('#app');
});
