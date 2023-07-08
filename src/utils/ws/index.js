import { isString } from 'lodash';
import { RECEIVE_MESSAGE, STATUS_CHANGE } from './configs/event';
import {
  STANDBY, //啟動ws之前
  CONNECTING, //已開通通路，未接收到訊息
  CONNECTED, //已接收到訊息
  DISCONNECTED, //斷線
  DISCONNECTING,
  RECONNECT, //斷線重新連線
  ERROR, //
} from './configs/status';

let STATUS_EVENT_GROUP = {
  [STANDBY]: null,
  [CONNECTING]: null,
  [CONNECTED]: null,
  [RECONNECT]: null,
  [DISCONNECTING]: null,
  [DISCONNECTED]: null,
  [ERROR]: null,
};

const CHECK_POINT_DELAY_MS = 10 * 60 * 1000;

//event
const onOpen = (wsInfo) => () => {
  checkConnectStatus(wsInfo);
  changeCurrentStatus(wsInfo, CONNECTING);
};

const onMessage = (wsInfo) => (e) => {
  checkConnectStatus(wsInfo);

  try {
    const msg = JSON.parse(e.data);
    const receiveMessageEvent = new CustomEvent(RECEIVE_MESSAGE, {
      detail: { msg },
    });

    wsInfo.dispatchEvent(receiveMessageEvent);
    changeCurrentStatus(wsInfo, CONNECTED);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
};

const onClose = (wsInfo) => () => {
  if (wsInfo.currentStatus === DISCONNECTING) {
    changeCurrentStatus(wsInfo, DISCONNECTED);
  }
};

const onError = (wsInfo) => (e) => {
  changeCurrentStatus(wsInfo, ERROR, e);
};

function wrapEventTargetFunctions(wsInfo) {
  const delegate = document.createDocumentFragment();

  wsInfo.addEventListener = (...payload) => {
    delegate.addEventListener(...payload);
  };
  wsInfo.dispatchEvent = (...payload) => {
    delegate.dispatchEvent(...payload);
  };
  wsInfo.removeEventListener = (...payload) => {
    delegate.removeEventListener(...payload);
  };

  return wsInfo
}

function injectionWSInfo(wsInfo, targetFn) {
  return (...payload) => {
    targetFn(wsInfo, ...payload);
  };
}

function changeCurrentStatus(wsInfo, status, payload = null) {
  if (wsInfo.currentStatus === status) return;

  const statusChangeEvent = new CustomEvent(STATUS_CHANGE, {
    detail: {
      prevStatus: wsInfo.currentStatus,
      currentStatus: status,
      payload,
    },
  });

  wsInfo.dispatchEvent(statusChangeEvent);

  wsInfo.currentStatus = status;
}

function setCheckConnectPoint(wsInfo) {
  const { instance, checkpointInfo } = wsInfo;
  const { timeIdQueue, delayMS } = checkpointInfo;

  if (instance && instance.readyState < 2) {
    const id = window.setTimeout(() => {
      checkpointInfo.count++;

      setCheckConnectPoint(wsInfo);

      changeCurrentStatus(wsInfo, CONNECTING, checkpointInfo.count);
    }, delayMS);

    timeIdQueue.push(id);
  }
}

function clearCheckpointInfo(wsInfo) {
  const { timeIdQueue } = wsInfo.checkpointInfo;

  timeIdQueue.forEach((id) => {
    window.clearTimeout(id);
  });

  timeIdQueue.splice(0, timeIdQueue.length);

  wsInfo.checkpointInfo.count = 0;
}

//取消舊的檢查，設定新的檢查
function checkConnectStatus(wsInfo) {
  clearCheckpointInfo(wsInfo);
  setCheckConnectPoint(wsInfo);
}

function subscribeEvents(wsInfo) {
  wsInfo.instance.addEventListener('open', onOpen(wsInfo));

  wsInfo.instance.addEventListener('message', onMessage(wsInfo));

  wsInfo.instance.addEventListener('error', onError(wsInfo));

  wsInfo.instance.addEventListener('close', onClose(wsInfo));
}

export function setOnReceivedMessage(wsInfo, event) {
  wsInfo.addEventListener(RECEIVE_MESSAGE, event);
}

export function setOnStatusChange(wsInfo, event) {
  wsInfo.addEventListener(STATUS_CHANGE, event);
}

export function connectWS(wsInfo) {
  let wsInstance = null;

  try {
    wsInstance = new WebSocket(wsInfo.path);
    wsInfo.instance = wsInstance;
    subscribeEvents(wsInfo);
    changeCurrentStatus(wsInfo, STANDBY);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
}

export function disconnectWS(wsInfo) {
  const { currentStatus } = wsInfo;
  if (currentStatus === DISCONNECTED || currentStatus === DISCONNECTING) return;

  try {
    wsInfo.instance.close();
    wsInfo.instance = null;

    clearCheckpointInfo(wsInfo);
    changeCurrentStatus(wsInfo, DISCONNECTING);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
}

export function reconnectWS(wsInfo) {
  try {
    if (wsInfo.instance) {
      wsInfo.instance.close();
      wsInfo.instance = null;
      clearCheckpointInfo(wsInfo);
    }

    wsInfo.instance = new WebSocket(wsInfo.path);

    subscribeEvents(wsInfo);
    changeCurrentStatus(wsInfo, RECONNECT);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
}

export function sendWS(wsInfo, payload) {
  const sendStr = isString(payload) ? payload : JSON.stringify(payload);

  try {
    wsInfo.instance.send(sendStr);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
}

export function wrapWebsocketAPI(wsInfo) {
  return {
    connect: injectionWSInfo(wsInfo, connectWS),
    reconnect: injectionWSInfo(wsInfo, reconnectWS),
    disconnect: injectionWSInfo(wsInfo, disconnectWS),
    send: injectionWSInfo(wsInfo, sendWS),
    onStatusChange: injectionWSInfo(wsInfo , setOnStatusChange),
    onReceivedMessage: injectionWSInfo(wsInfo , setOnReceivedMessage),
  };
}

export default function createWebsocketConnectInfo({
  path,
  customeStatusEventGroup = {},
  checkpointDelayMS,
}) {
  const hasSetEvent = typeof statusEvents === 'object';

  const statusEventGroup = hasSetEvent
    ? {
        ...STATUS_EVENT_GROUP,
        ...customeStatusEventGroup,
      }
    : STATUS_EVENT_GROUP;

  const wsInfo = {
    instance: null,
    path,
    currentStatus: STANDBY,
    statusEventGroup: {
      ...STATUS_EVENT_GROUP,
      ...statusEventGroup,
    },
    checkpointInfo: {
      timeIdQueue: [],
      count: 0,
      delayMS: isNaN(checkpointDelayMS)
        ? CHECK_POINT_DELAY_MS
        : checkpointDelayMS,
    },
  };
  
  return wrapEventTargetFunctions(wsInfo);
}
