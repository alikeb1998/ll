import {
	FontFamily,
	SettingsActionTypes,
	SettingsState,
	SET_FONT_FAMILY,
	SET_FONT_SIZE,
	SET_THEME,
	Themes,
} from './types';

const initialState: SettingsState = {
	fontSize: 0,
	fontFamily: FontFamily.QUICKSAND,
	theme: Themes.light,
};

export const settingsReducer = (
	state = initialState,
	action: SettingsActionTypes
): SettingsState => {
	switch (action.type) {
		case SET_FONT_SIZE:
			return {...state, fontSize: action.payload};
		case SET_FONT_FAMILY:
			return {...state, fontFamily: action.payload};
		case SET_THEME:
			return {...state, theme: action.payload};
		default:
			return state;
	}
};
