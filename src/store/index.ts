import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';

import {appReducer} from './app/reducers';
import {bookReducer} from './book/reducers';
import {settingsReducer} from './settings/reducers';

const rootReducer = combineReducers({
	settings: settingsReducer,
	app: appReducer,
	book: bookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(reduxThunk)),
);

export type AppDispatch = typeof store.dispatch;
