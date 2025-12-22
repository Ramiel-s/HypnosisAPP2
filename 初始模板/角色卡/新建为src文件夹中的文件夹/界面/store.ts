import { Schema } from '../schema';

<<<<<<< HEAD
export const useDataStore = defineStore('data', () => {
  const message_id = getCurrentMessageId();
  const data = ref(Schema.parse(_.get(getVariables({ type: 'message', message_id }), 'stat_data', {})));

  watchEffect(() => {
    updateVariablesWith(
      variables => {
        _.set(variables, 'stat_data', klona(data.value));
=======
export const useDataStore = defineStore(
  'data',
  errorCatched(() => {
    const message_id = getCurrentMessageId();

    const data = ref(Schema.parse(_.get(getVariables({ type: 'message', message_id }), 'stat_data', {})));

    watchDebounced(
      data,
      new_data => {
        const parsed = Schema.parse(new_data);
        if (!_.isEqual(parsed, new_data)) {
          data.value = parsed;
        }
        updateVariablesWith(
          variables => {
            _.set(variables, 'stat_data', parsed);
>>>>>>> 716752b8f21fc75a91a1604ff7eb277d5de3327e
        return variables;
      },
      { type: 'message', message_id },
    );
<<<<<<< HEAD
  });

  return { data };
});
=======
      },
      { deep: true, debounce: 500 },
    );

    return { data };
  }),
);
>>>>>>> 716752b8f21fc75a91a1604ff7eb277d5de3327e
