import {BookData} from '../../utils';

export interface BookState {
	data?: BookData;
	currentChapter: number;
}

export const SET_DATA = 'BOOK-SET_DATA';
export const SET_CURRENT_CHAPTER = 'BOOK-SET_CURRENT_CHAPTER';

interface SetData {
	type: typeof SET_DATA;
	payload?: BookData;
}

interface SetCurrentChapter {
	type: typeof SET_CURRENT_CHAPTER;
	payload: number;
}

export type BookActionTypes = SetData | SetCurrentChapter;
