import { DISCONNECT } from 'constants/wsCommands';

export const refreshDataAction = (type, payload) => ({
  type: `REFRESH_${type}`,
  payload,
});

export const disconnectAction = (type) => ({
  type: `WS_${type}_COMMAND`,
  payload: {
    command: DISCONNECT,
  },
});
