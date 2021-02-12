import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';

import {epubParser} from '../utils';
import {RootState} from '../store';
import {setError, setLoading} from '../store/app/actions';
import {setData} from '../store/book/actions';

export const handleEpubThunk = (
	file: File
): ThunkAction<void, RootState, unknown, Action<string>> => async (
	dispatch
) => {
	dispatch(setLoading(true));

	try {
		const data = await epubParser(file);

		dispatch(setData(data));
	} catch (error) {
		dispatch(setError('Invalid input. Error while trying to parse the file.'));
	}

	dispatch(setLoading(false));
};
