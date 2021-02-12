export interface AppState {
	isLoading: boolean;
	error?: string;
}

export const SET_LOADING = 'App-SET_LOADING';
export const SET_ERROR = 'App-SET_ERROR';
export const REMOVE_ERROR = 'App-REMOVE_ERROR';

interface SetLoading {
	type: typeof SET_LOADING;
	payload: boolean;
}

interface SetError {
	type: typeof SET_ERROR;
	payload: string;
}

interface RemoveError {
	type: typeof REMOVE_ERROR;
}

export type AppActionTypes = SetLoading | SetError | RemoveError;
