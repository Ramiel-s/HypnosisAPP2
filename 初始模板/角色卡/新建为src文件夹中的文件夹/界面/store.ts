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
>>>>>>> fa6f61d75970bed3668f8d9d1d044052890e077a
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
>>>>>>> fa6f61d75970bed3668f8d9d1d044052890e077a
