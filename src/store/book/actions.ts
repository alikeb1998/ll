import {BookData} from '../../utils';
import {BookActionTypes, SET_DATA, SET_CURRENT_CHAPTER} from './types';

export const setData = (data?: BookData): BookActionTypes => ({
	type: SET_DATA,
	payload: data,
});

export const setCurrentChapter = (currentChapter: number): BookActionTypes => ({
	type: SET_CURRENT_CHAPTER,
	payload: currentChapter,
});
