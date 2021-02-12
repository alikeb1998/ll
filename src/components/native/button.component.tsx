import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { RootState } from '../../store';
import { Color, FontFamily } from '../../store/settings/types';

interface ButtonContainerProps {
	fontFamily: FontFamily;
	background: Color;
	color: Color;
	fill?: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
	padding: 10px 20px;
	text-align: center;
	font-family: ${({ fontFamily }) => fontFamily};
	background-color: ${({ background }) => background};
	color: ${({ color }) => color};
	border-radius: 50vh;
	user-select: none;
	cursor: pointer;
	transition: all 336ms;

	&:hover {
		opacity: 0.7;
		transform: scale(1.05);
	}

	${({ fill }) => fill && css`
		width: 100%;
	`}
`;

interface Props {
	fontFamily?: FontFamily;
	primary?: boolean;
	fill?: boolean;
	color?: Color;
	onClick?: () => void;
}

export const Button: FC<Props> = ({ fontFamily, children, primary = false, onClick, ...props }) => {
	const {
		fontFamily: defaultFontFamily,
		theme: { accent, primary: primaryColor, foreground }
	} = useSelector(({ settings }: RootState) => settings);

	return (
		<ButtonContainer fontFamily={fontFamily || defaultFontFamily} background={primary ? primaryColor : accent} color={foreground} onClick={onClick} {...props}>
			{children}
		</ButtonContainer>
	);
};
