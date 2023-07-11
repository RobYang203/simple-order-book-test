import { DISCONNECT } from 'constants/wsCommands';

export const processDataAction = (type, payload) => ({
  type: `${type}_PROCESSING`,
  payload,
});

export const disconnectAction = (type) => ({
  type: `WS_${type}_COMMAND`,
  payload: {
    command: DISCONNECT,
  },
});
