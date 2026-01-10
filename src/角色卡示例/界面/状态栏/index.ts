<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b46ddb92fd5449e29fb6ab10f5a94f01b416987a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b46ddb92fd5449e29fb6ab10f5a94f01b416987a
  createApp(App).use(createPinia()).mount('#app');
});
