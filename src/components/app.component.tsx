import React from 'react';
import { Provider } from 'react-redux';

import { RootRouter } from '../routes';
import { store } from '../store';

export const App = () => {
  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
};
