import {AppActionTypes, REMOVE_ERROR, SET_ERROR, SET_LOADING} from './types';

export const setLoading = (isLoading: boolean): AppActionTypes => ({
	type: SET_LOADING,
	payload: isLoading,
});

export const setError = (error: string): AppActionTypes => ({
	type: SET_ERROR,
	payload: error,
});

export const removeError = (): AppActionTypes => ({
	type: REMOVE_ERROR,
});
