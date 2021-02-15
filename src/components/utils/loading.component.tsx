import {createPortal} from 'react-dom';
import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

import {BookAnimation} from '../../assets';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Color} from '../../store/settings/types';

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
  flex-direction: row;
  transition: all 336ms;
  justify-content: center;
  align-items: center;
  background: ${({background}) => background};
`;

export const Loading = () => {
	const {app: {isLoading}, settings: {theme: {background}}} = useSelector((state: RootState) => state);

	return createPortal((
		<Container active={isLoading} background={background}>
			<Lottie options={{
				loop: true,
				autoplay: true,
				animationData: BookAnimation,
				rendererSettings: {
					preserveAspectRatio: 'xMidYMid slice',
				},
			}} height={100} width={100} />
		</Container>
	), document.getElementById('loading')!);
};
