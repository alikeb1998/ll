import React from 'react';
import {createPortal} from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {RootState} from '../../store';
import {removeError} from '../../store/app/actions';
import {Color} from '../../store/settings/types';
import {Button} from '../native';

interface ContainerProps {
	active: boolean;
	background: Color;
}

const Container = styled.div<ContainerProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: ${({active}) => active ? '0' : '-100vw'};
  display: flex;
  flex-direction: column;
  transition: all 336ms;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  background: ${({background}) => background};
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

interface ErrorContainerProps {
	color: string;
}

const ErrorContainer = styled.div<ErrorContainerProps>`
  width: 200px;
  padding: 10px;
  border: 2px solid #FF0000;
  border-radius: 10px;
  color: ${({color}) => color};
`;

export const Error = () => {
	const dispatch = useDispatch();
	const {app: {error}, settings: {theme: {background, foreground}}} = useSelector((state: RootState) => state);

	const onContinueClick = () => () => {
		dispatch(removeError());
	};

	return createPortal((
		<Container active={!!error} background={background}>
			<Header>An error occurred!</Header>
			<ErrorContainer color={foreground}>
				{error}
			</ErrorContainer>
			<Button onClick={onContinueClick()}>Continue</Button>
		</Container>
	), document.getElementById('error')!);
};

export default Error;
