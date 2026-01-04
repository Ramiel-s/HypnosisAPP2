<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 0bdc075ba63105824b4f4f433b4720e2310f6138
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 0bdc075ba63105824b4f4f433b4720e2310f6138
  createApp(App).use(createPinia()).mount('#app');
});
