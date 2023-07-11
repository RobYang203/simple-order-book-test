import { disconnectAction, processDataAction } from 'actions/creators';
import { eventChannel } from 'redux-saga';
import {
  cleanWaitingToSendBuffer,
  reconnectWS,
  sendWS,
  setOnConnected,
  setOnConnecting,
  setOnError,
  setOnReceivedMessage,
} from 'utils/ws';

const CHECK_COUNT = 5;
const waitReconnectMS = 60 * 1000;
const TRY_RECONNECT_COUNT = 5;

let timeID = null;
let tryReconnectCount = 0;

export const createWebsocketChannel = (wsInfo, actionType) => {
  return eventChannel((emitter) => {
    setOnConnecting(wsInfo, (e) => {
      sendWS(wsInfo, 'ping');

      if (wsInfo.checkpointInfo.count > CHECK_COUNT) {
        reconnectWS(wsInfo);
      }
    });

    setOnConnected(wsInfo, (e) => {
      cleanWaitingToSendBuffer(wsInfo);
    });

    setOnError(wsInfo, (e) => {
      if (timeID && tryReconnectCount > TRY_RECONNECT_COUNT) return;

      timeID = window.setTimeout(() => {
        reconnectWS(wsInfo);
        timeID = null;
        tryReconnectCount++;
      }, waitReconnectMS);
    });

    setOnReceivedMessage(wsInfo, async (e) => {
      const payload = e.detail.msg;
      if (typeof payload !== 'object') return;

      emitter(processDataAction(actionType, payload));
    });

    return () => {
      emitter(disconnectAction(actionType));
    };
  });
};
