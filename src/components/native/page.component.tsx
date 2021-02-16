import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import styled, {createGlobalStyle} from 'styled-components';

import {RootState} from '../../store';
import {Color, FontFamily} from '../../store/settings/types';


interface StyleProps {
	fontFamily: FontFamily;
}

const Style = createGlobalStyle<StyleProps>`
  * {
    font-family: ${({fontFamily}) => fontFamily};
  }
`;

interface PageContainerProps {
	background: Color;
}

const PageContainer = styled.div<PageContainerProps>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: ${({background}) => background};
`;

export const Page: FC = ({children}) => {
	const {theme: {background}, fontFamily} = useSelector(({settings}: RootState) => settings);

	return (
		<PageContainer background={background}>
			<Style fontFamily={fontFamily} />
			{children}
		</PageContainer>
	);
};
