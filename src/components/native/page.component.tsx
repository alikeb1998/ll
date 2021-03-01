import React, {FC, RefObject} from 'react';
import {useSelector} from 'react-redux';
import styled, {createGlobalStyle} from 'styled-components';

import {RootState} from '../../store';
import {Color, FontFamily} from '../../store/settings/types';


interface StyleProps {
	fontFamily: FontFamily;
	color: Color;
	background: Color;
}

const Style = createGlobalStyle<StyleProps>`
  * {
    font-family: ${({fontFamily}) => fontFamily};
		overflow-scrolling: touch;
		overflow-wrap: break-word;
  }
	
	html {
		background-color: ${({background}) => background};
	}

  body, #root {
    overflow-x: hidden;
  }

  *::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({color}) => color}AA;
    border-radius: 10px;
    transition: all 336ms;
  }

  *::-webkit-scrollbar-thumb:active {
    background-color: ${({color}) => color};
  }
`;

interface PageContainerProps {
	background: Color;
}

const PageContainer = styled.div<PageContainerProps>`
  width: 100vw;
  background-color: ${({background}) => background};
`;

interface BackgroundProps {
	background: Color;
}

const Background = styled.div<BackgroundProps>`
	position: fixed;
	width: 100vw;
	height: 200vh;
  z-index: 0;
  background-color: ${({background}) => background};
`;

const Children = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 1;
`;

interface Props {
	containerRef?: RefObject<HTMLDivElement>;
}

export const Page: FC<Props> = ({children, containerRef}) => {
	const {theme: {background, accent}, fontFamily} = useSelector(({settings}: RootState) => settings);

	return (
		<PageContainer background={background} ref={containerRef}>
			<Style fontFamily={fontFamily} color={accent} background={background} />
			<Background background={background}/>
			<Children>
				{children}
			</Children>
		</PageContainer>
	);
};
