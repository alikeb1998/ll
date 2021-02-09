import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export const App = () => {
  return (
    <Provider store={store}>
    </Provider>
  );
};
