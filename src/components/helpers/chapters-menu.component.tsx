import React, {useState} from 'react';
import styled, {css} from 'styled-components';

import {Color, FontFamily} from '../../store/settings/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Close, Menu} from '../../assets';
import {useWindowSize} from '../../hooks';
import {setCurrentChapter} from '../../store/book/actions';

const Container = styled.div`
  width: 100vw;
`;

interface OpenButtonProps {
	shadow: boolean;
	background: Color;
}

const OpenButton = styled.div<OpenButtonProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 336ms;
  background: ${({background}) => background};
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    opacity: 0.7;
    transform: scale(1.05) translateX(-50%);
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 3px 20px 0 #00000029;
  `}
`;

interface PanelProps {
	background: Color;
	color: Color;
	shadow: boolean;
	active: boolean;
	height: number;
}

const Panel = styled.div<PanelProps>`
  width: 100vw;
  position: fixed;
  top: -20px;
  background: ${({background}) => background};
  border-radius: 10px;
  transition: all 336ms;
  left: ${({active}) => active ? '0' : '-100vw'};
  color: ${({color}) => color};
  z-index: 2;
  height: ${({height}) => height}px;
  overflow-y: auto;

  ${({shadow}) => shadow && css`
    box-shadow: 0 10px 30px 0 #00000029;
  `}
`;

const CloseControllerContainer = styled.div`
  padding: 40px;
  text-align: center;
  transition: all 336ms;

  &:hover {
    opacity: 0.7;
  }
`;

interface ChapterControllerProps {
	fontFamily: FontFamily;
	color: Color;
	selected: boolean;
}

const ChapterContainer = styled.div<ChapterControllerProps>`
  padding: 20px;
  text-align: center;
  transition: all 336ms;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  color: ${({color}) => color};

  &:hover {
    opacity: 0.7;
    background-color: ${({color}) => color}44;
  }

  ${({selected, color}) => selected && css`
    background-color: ${color}22;
    opacity: 0.7;
  `}
`;

export const ChaptersMenu = () => {
	const dispatch = useDispatch();
	const {
		book: {data, currentChapter},
		settings: {theme: {secondaryBackground, shadow, foreground}, fontFamily},
	} = useSelector((state: RootState) => state);

	const [isOpen, setOpen] = useState(false);

	const {height} = useWindowSize();

	const onOpenButtonClick = () => () => setOpen(isOpen => !isOpen);
	const onChapterClick = (chapter: number) => () => {
		dispatch(setCurrentChapter(chapter));
		setOpen(false);
	};

	const renderChapters = () => data?.content?.chapters?.map((_, i) => (
		<ChapterContainer fontFamily={fontFamily} color={foreground} selected={i === currentChapter}
											onClick={onChapterClick(i)}>
			Chapter {i + 1}
		</ChapterContainer>
	));

	return (
		<Container>
			<OpenButton shadow={shadow} background={secondaryBackground} onClick={onOpenButtonClick()}>
				<Menu color={foreground} />
			</OpenButton>
			<Panel background={secondaryBackground} active={isOpen} shadow={shadow} color={foreground} height={height - 80}>
				<CloseControllerContainer onClick={onOpenButtonClick()}>
					<Close color={foreground} />
				</CloseControllerContainer>
				{renderChapters()}
			</Panel>
		</Container>
	);
};
