import { CONNECT, DISCONNECT, RECONNECT, SEND } from 'constants/wsCommands';
import { connectWS, disconnectWS, reconnectWS, sendWS } from 'utils/ws';
import BigNumber from 'bignumber.js';

export function mergeClass(...classes) {
  return classes.reduce((total, next) => {
    return {
      ...total,
      ...next,
    };
  }, {});
}

export function executeWSCommand(wsInfo, command, payload) {
  try {
    switch (command) {
      case SEND:
        sendWS(wsInfo, payload);
        break;
      case CONNECT:
        connectWS(wsInfo);
        break;
      case DISCONNECT:
        disconnectWS(wsInfo);
        break;
      case RECONNECT:
        reconnectWS(wsInfo);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: wsSaga.js:30 ~ function*executeOrderbookWSSaga ~ error:',
      error
    );
  }
}

export const sortByDesc = (list, key) => {
  return list.sort((a, b) => {
    const BN = BigNumber.clone();
    return BN(a[key] ?? 0).comparedTo(b[key] ?? 0) < 1;
  });
};

export const getMax8 = (list) => {
  return list.filter((item, index) => index < 8);
};

export const plusNumber = (a = 0, b = 0) => {
  const BN = BigNumber.clone();
  return BN(a).plus(b).toString();
};

export const divideNumber = (a = 0, b = 0) => {
  const BN = BigNumber.clone();
  return BN(a).dividedBy(b).toString();
};

export const getPercent = (number) => {
  const BN = BigNumber.clone();
  return BN(number).multipliedBy(100).toString();
};

export const compareNumber = (a, b) => {
  const BN = BigNumber.clone();
  return BN(a ?? 0).comparedTo(b ?? 0);
};
