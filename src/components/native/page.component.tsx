import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store';
import { Color } from '../../store/settings/types';

interface PageContainerProps {
	background: Color;
}

const PageContainer = styled.div<PageContainerProps>`
	width: 100vw;
	height: 100vh;
	overflow-y: auto;
	overflow-x: hidden;
	background-color: ${({ background }) => background};
`;

export const Page: FC = ({ children }) => {
	const { background } = useSelector(({ settings: { theme } }: RootState) => theme);

	return (
		<PageContainer background={background}>
			{children}
		</PageContainer>
	);
};
