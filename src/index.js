import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from 'store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import { use100vh } from 'react-div-100vh';

const container = document.getElementById('root');
const root = createRoot(container);

const { store, runSaga } = configureStore();

runSaga();

function Index() {
  const height = use100vh();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider resetCSS theme={{ ...theme, otherVariables: { height } }}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );
}

root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
