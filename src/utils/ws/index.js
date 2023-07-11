import { isString } from 'lodash';
import { RECEIVE_MESSAGE, STATUS_CHANGE } from './configs/event';
import {
  STANDBY, //啟動ws之前
  CONNECTING, //已開通通路，未接收到訊息
  CONNECTED, //已接收到訊息
  DISCONNECTED, //斷線
  DISCONNECTING,
  RECONNECT, //斷線重新連線
  ERROR,
  NOTREADY, //
} from './configs/status';

const CHECK_POINT_DELAY_MS = 1 * 60 * 1000;

//event
const onOpen = (wsInfo) => () => {
  checkConnectStatus(wsInfo);
  changeCurrentStatus(wsInfo, CONNECTING);
};

const onMessage = (wsInfo) => (e) => {
  checkConnectStatus(wsInfo);

  try {
    const msg = e.data === 'pong' ? e.data : JSON.parse(e.data);

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
  clearCheckpointInfo(wsInfo);
  wsInfo.instance = null;

  if (wsInfo.currentStatus === DISCONNECTING) {
    changeCurrentStatus(wsInfo, DISCONNECTED);
  }
};

const onError = (wsInfo) => (e) => {
  console.error(wsInfo, e);

  clearCheckpointInfo(wsInfo);
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

  return wsInfo;
}

function injectionWSInfo(wsInfo, targetFn) {
  return (...payload) => {
    targetFn(wsInfo, ...payload);
  };
}

function changeCurrentStatus(wsInfo, status, payload = null) {
  const prevStatus = wsInfo.currentStatus;
  wsInfo.currentStatus = status;

  const statusEvent = new CustomEvent(status, {
    payload,
  });

  wsInfo.dispatchEvent(statusEvent);

  if (prevStatus === status) return;

  const statusChangeEvent = new CustomEvent(STATUS_CHANGE, {
    detail: {
      prevStatus,
      currentStatus: status,
      payload,
    },
  });
  wsInfo.dispatchEvent(statusChangeEvent);
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

function setCmdToBuffer(wsInfo, cmd) {
  wsInfo.waitingToSendBuffer.push(cmd);
}

function isStatusConnect(wsInfo) {
  return (
    wsInfo.currentStatus === CONNECTED || wsInfo.currentStatus === CONNECTING
  );
}

export function setOnReceivedMessage(wsInfo, event) {
  wsInfo.addEventListener(RECEIVE_MESSAGE, event);
}

export function setOnStatusChange(wsInfo, event) {
  wsInfo.addEventListener(STATUS_CHANGE, event);
}

export function setOnStandBy(wsInfo, event) {
  wsInfo.addEventListener(STANDBY, event);
}

export function setOnConnecting(wsInfo, event) {
  wsInfo.addEventListener(CONNECTING, event);
}

export function setOnConnected(wsInfo, event) {
  wsInfo.addEventListener(CONNECTED, event);
}

export function setOnDisconnected(wsInfo, event) {
  wsInfo.addEventListener(DISCONNECTED, event);
}

export function setOnDisconnecting(wsInfo, event) {
  wsInfo.addEventListener(DISCONNECTING, event);
}

export function setOnReconnect(wsInfo, event) {
  wsInfo.addEventListener(RECONNECT, event);
}

export function setOnError(wsInfo, event) {
  wsInfo.addEventListener(ERROR, event);
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
  if (
    currentStatus === DISCONNECTED ||
    currentStatus === DISCONNECTING ||
    currentStatus === ERROR
  )
    return;

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
    if (!isStatusConnect(wsInfo.currentStatus)) {
      tryReconnect();
      return;
    }

    disconnectWS(wsInfo);

    function tryReconnect() {
      wsInfo.instance = new WebSocket(wsInfo.path);

      subscribeEvents(wsInfo);
      changeCurrentStatus(wsInfo, RECONNECT);

      wsInfo.removeEventListener(tryReconnect);
    }

    wsInfo.addEventListener(DISCONNECTED, tryReconnect);
  } catch (e) {
    changeCurrentStatus(wsInfo, ERROR, e);
  }
}

export function cleanWaitingToSendBuffer(wsInfo) {
  wsInfo.waitingToSendBuffer.forEach((cmd) => {
    sendWS(wsInfo, cmd);
  });

  wsInfo.waitingToSendBuffer = [];
}

export function sendWS(wsInfo, payload) {
  const sendStr = isString(payload) ? payload : JSON.stringify(payload);

  if (!isStatusConnect(wsInfo)) {
    setCmdToBuffer(wsInfo, sendStr);
    return;
  }

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
    onStatusChange: injectionWSInfo(wsInfo, setOnStatusChange),
    onReceivedMessage: injectionWSInfo(wsInfo, setOnReceivedMessage),
  };
}

export default function createWebsocketConnectInfo({
  path,
  checkpointDelayMS,
}) {
  const wsInfo = {
    instance: null,
    path,
    currentStatus: NOTREADY,
    waitingToSendBuffer: [],
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
