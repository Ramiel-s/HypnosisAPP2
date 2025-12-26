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
>>>>>>> 6750c9a8961718a9d3a32b787ee7d4012d452c3c
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
>>>>>>> 6750c9a8961718a9d3a32b787ee7d4012d452c3c
