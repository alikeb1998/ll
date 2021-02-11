import {
	FontFamily,
	SettingsActionTypes,
	SET_FONT_FAMILY,
	SET_FONT_SIZE,
	SET_THEME,
	Theme,
} from './types';

export const setFontSize = (fontSize: number): SettingsActionTypes => ({
	type: SET_FONT_SIZE,
	payload: fontSize,
});

export const setFontFamily = (fontFamily: FontFamily): SettingsActionTypes => ({
	type: SET_FONT_FAMILY,
	payload: fontFamily,
});

export const setTheme = (theme: Theme): SettingsActionTypes => ({
	type: SET_THEME,
	payload: theme,
});
