import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled, {css} from 'styled-components';
import {Back} from '../../assets';
import {RootState} from '../../store';
import {setCurrentChapter} from '../../store/book/actions';
import {Color} from '../../store/settings/types';

interface ContainerProps {
	background: Color;
	shadow: boolean;
	isOpen: boolean;
}

const Container = styled.div<ContainerProps>`
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background: ${({background}) => background};
  position: fixed;
  bottom: ${({isOpen}) => isOpen ? 0 : -80}px;
  transition: all 336ms;

  ${({shadow}) => shadow && css`
    box-shadow: 0 -10px 40px 0 #00000029;
  `}
`;

const Bar = styled.div`
  width: 80%;
  height: 24px;
  border-radius: 12px;
  background: ${Color.MALACHITE}4C;
`;

interface FilledBarProps {
	fill: number;
}

const FilledBar = styled.div<FilledBarProps>`
  width: ${({fill}) => fill}%;
  height: 24px;
  border-radius: 12px;
  background: ${Color.MALACHITE};
  color: ${Color.WHITE};
  transition: all 336ms;
`;

const StepText = styled.div`
  user-select: none;
  position: relative;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  direction: rtl;
`;

interface OpenButtonProps {
	shadow: boolean;
	background: Color;
	reversed: boolean;
	disabled: boolean;
}

const ControllerButton = styled.div<OpenButtonProps>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 336ms;
  background: ${({background}) => background};
  z-index: 1;
  margin: 0 10px;

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 3px 20px 0 #00000029;
  `}

  ${({reversed, disabled}) => reversed && css`
    transform: scaleX(-1);

    &:hover {
      transform: scaleX(-1.05) scaleY(1.05);
    }

    ${disabled && css`
      transform: scale(-1) !important;
    `}
  `}

  ${({disabled}) => disabled && css`
    opacity: 0.5 !important;
    transform: scale(1);
  `}
`;

interface Props {
	isOpen: boolean;
}

export const ChapterController: FC<Props> = ({isOpen}) => {
	const dispatch = useDispatch();
	const {
		book: {data, currentChapter},
		settings: {theme: {background, secondaryBackground, shadow, foreground}},
	} = useSelector((state: RootState) => state);

	const chapters = data?.content?.chapters?.length || 1;
	const pervDisabled = currentChapter === 0;
	const nextDisabled = currentChapter === chapters - 1;

	const onPrevClick = () => () => dispatch(setCurrentChapter(currentChapter - 1));
	const onNextClick = () => () => dispatch(setCurrentChapter(currentChapter + 1));

	return (
		<Container background={secondaryBackground} shadow={shadow} isOpen={isOpen}>
			<ControllerButton shadow={shadow} background={background} reversed={false}
												onClick={pervDisabled ? undefined : onPrevClick()}
												disabled={pervDisabled}>
				<Back color={foreground} />
			</ControllerButton>
			<Bar>
				<FilledBar fill={(currentChapter + 1) / chapters * 100}>
					<StepText>{currentChapter + 1}/{chapters}</StepText>
				</FilledBar>
			</Bar>
			<ControllerButton shadow={shadow} background={background} reversed
												onClick={nextDisabled ? undefined : onNextClick()}
												disabled={nextDisabled}>
				<Back color={foreground} />
			</ControllerButton>
		</Container>
	);
};
