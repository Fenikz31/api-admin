import { api } from 'boot/axios';

import helpers from 'helpers/index';
import { useMessagesStore } from 'stores/messages';

const { setMessage } = useMessagesStore();

export default {
  async get(props) {
    try {
      const result = await api.get(props.resource, props.options);
      const { data, status, ...rest } = result;
      setMessage({
        code: rest.statusText,
        message: 'Operation successful',
        status,
      });
      return data.result;
    } catch (error) {
      console.error(error);
      const data = {
        code: error.code,
        message: error.response.data.reason,
        status: error.response.status,
      };
      setMessage(data);
      return error;
    }
  },
};
