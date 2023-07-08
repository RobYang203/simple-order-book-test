import { disconnectAction, refreshDataAction } from 'actions/creators';
import { eventChannel } from 'redux-saga';
import { setOnReceivedMessage, setOnStatusChange } from 'utils/ws';

export const createWebsocketChannel = (wsInfo, actionType) => {
  return eventChannel((emitter) => {
    setOnStatusChange(wsInfo, (e) => {});

    setOnReceivedMessage(wsInfo, (e) => {
      const payload = e.detail.msg;
      emitter(refreshDataAction(actionType , payload));
    });

    return () => {
      emitter(disconnectAction(actionType))
    };
  });
};
