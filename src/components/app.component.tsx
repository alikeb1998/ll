import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import { RootRouter } from '../routes';
import { store } from '../store';

const Style = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const App = () => {
  return (
    <Provider store={store}>
      <Style />
      <RootRouter />
    </Provider>
  );
};
