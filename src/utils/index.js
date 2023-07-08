import { CONNECT, DISCONNECT, RECONNECT, SEND } from 'constants/wsCommands';
import { connectWS, disconnectWS, reconnectWS, sendWS } from 'utils/ws';

export function executeWSCommand(wsInfo, command, payload) {
  try {
    switch (command) {
      case SEND:
        sendWS(wsInfo , payload)
        break;
      case CONNECT:
        connectWS(wsInfo)
        break;
      case DISCONNECT:
        disconnectWS(wsInfo)
        break;
      case RECONNECT:
        reconnectWS(wsInfo)
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
