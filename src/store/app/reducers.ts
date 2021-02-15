import {
	AppActionTypes,
	AppState,
	REMOVE_ERROR,
	SET_ERROR,
	SET_LOADING,
} from './types';

const initialState: AppState = {
	isLoading: false,
};

export const appReducer = (
	state = initialState,
	action: AppActionTypes,
): AppState => {
	switch (action.type) {
		case SET_LOADING:
			return {...state, isLoading: action.payload};
		case SET_ERROR:
			return {...state, error: action.payload};
		case REMOVE_ERROR:
			return {...state, error: undefined};
		default:
			return state;
	}
};
