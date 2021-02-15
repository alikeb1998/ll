import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled, {css} from 'styled-components';
import {Back} from '../../assets';
import {RootState} from '../../store';
import {setCurrentChapter, setData} from '../../store/book/actions';
import {Color} from '../../store/settings/types';

interface OpenButtonProps {
	shadow: boolean;
	background: Color;
}

const BackButton = styled.div<OpenButtonProps>`
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

  &:hover {
    opacity: 0.7;
    transform: scale(1.05);
  }

  ${({shadow}) => shadow && css`
    box-shadow: 0 3px 20px 0 #00000029;
  `}
`;

export const BackHome = () => {
	const dispatch = useDispatch();
	const {secondaryBackground, shadow, foreground} = useSelector(({settings: {theme}}: RootState) => theme);

	const onBackButtonClick = () => () => {
		dispatch(setData());
		dispatch(setCurrentChapter(0));
	};

	return (
		<BackButton shadow={shadow} background={secondaryBackground} onClick={onBackButtonClick()}>
			<Back color={foreground} />
		</BackButton>
	);
};
