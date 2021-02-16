import React, {FC, RefObject} from 'react';
import {useSelector} from 'react-redux';
import styled, {createGlobalStyle} from 'styled-components';

import {RootState} from '../../store';
import {Color, FontFamily} from '../../store/settings/types';


interface StyleProps {
	fontFamily: FontFamily;
	color: Color;
}

const Style = createGlobalStyle<StyleProps>`
  * {
    font-family: ${({fontFamily}) => fontFamily};

    &::-webkit-scrollbar {
      width: 12px;
      background-color: transparent;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({color}) => color}AA;
      border-radius: 10px;
      transition: all 336ms;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: ${({color}) => color};
    }
  }
`;

interface PageContainerProps {
	background: Color;
}

const PageContainer = styled.div<PageContainerProps>`
  width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
  background-color: ${({background}) => background};
`;

interface Props {
	containerRef?: RefObject<HTMLDivElement>;
}

export const Page: FC<Props> = ({children, containerRef}) => {
	const {theme: {background, accent}, fontFamily} = useSelector(({settings}: RootState) => settings);

	return (
		<PageContainer background={background} ref={containerRef}>
			<Style fontFamily={fontFamily} color={accent}/>
			{children}
		</PageContainer>
	);
};
