<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 124945a90966936241183bf0fa550c6a426a6f17
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 124945a90966936241183bf0fa550c6a426a6f17
  createApp(App).use(createPinia()).mount('#app');
});
