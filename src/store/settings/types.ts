export enum FontFamily {
	QUICKSAND = "'Quicksand', sans-serif",
	PT_SANS = "'PT Sans', sans-serif",
	PT_SERIF = "'PT Serif', serif",
}

export enum Color {
	WHITE = '#FFFFFF',
	OXFORD_BLUE = '#0E2248',
	MALACHITE = '#10DC6A',
	RICH_BLACK_FORGA = '#0B1425',
	ALICE_BLUE = '#F2F5FB',
	CORNSILK = '#FFF6D7',
	TURQUOISE = '#6ADDD3',
}

export interface Theme {
	background: Color;
	secondaryBackground: Color;
	foreground: Color;
	accent: Color;
	primary: Color;
	shadow: boolean;
}

export const Themes: {
	[key: string]: Theme;
} = {
	light: {
		background: Color.WHITE,
		secondaryBackground: Color.WHITE,
		foreground: Color.OXFORD_BLUE,
		accent: Color.MALACHITE,
		primary: Color.ALICE_BLUE,
		shadow: true,
	},
	dark: {
		background: Color.RICH_BLACK_FORGA,
		secondaryBackground: Color.OXFORD_BLUE,
		foreground: Color.WHITE,
		accent: Color.MALACHITE,
		primary: Color.RICH_BLACK_FORGA,
		shadow: false,
	},
};

export interface SettingsState {
	fontSize: number;
	fontFamily: FontFamily;
	theme: Theme;
}

export const SET_FONT_SIZE = 'SETTINGS-SET_FONT_SIZE';
export const SET_FONT_FAMILY = 'SETTINGS-SET_FONT_FAMILY';
export const SET_THEME = 'SETTINGS-SET_THEME';

interface SetFontSize {
	type: typeof SET_FONT_SIZE;
	payload: number;
}

interface SetFontFamily {
	type: typeof SET_FONT_FAMILY;
	payload: FontFamily;
}

interface SetTheme {
	type: typeof SET_THEME;
	payload: Theme;
}

export type SettingsActionTypes = SetFontSize | SetFontFamily | SetTheme;
