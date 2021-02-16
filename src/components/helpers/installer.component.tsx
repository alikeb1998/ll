import React, {useState} from 'react';
import styled from 'styled-components';

import {useInstallationPrompt} from '../../hooks';
import {Color} from '../../store/settings/types';
import {Button} from '../native';

interface ContainerProps {
	show: boolean;
}

const Container = styled.div<ContainerProps>`
	position: fixed;
	width: 100vw;
	height: 100vh;
	bottom: ${({show}) => show ? 0 : '-100vh'};
	left: 0;
	transition: all 336ms;
	background-color: #000000AA;
	
	& > div {
    bottom: ${({show}) => show ? 0 : '-100vh'};
	}
`;

const CTAContainer = styled.div`
	position: fixed;
	width: 100vw;
  padding: 16px;
	border-top-left-radius: 30px;
  border-top-right-radius: 30px;
	background-color: ${Color.WHITE};
	border: 2px solid ${Color.MALACHITE};
	border-bottom: none;
`;

const CTAHeader = styled.div`
	font-weight: bold;
`;

const CTAButtons = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	margin: 12px 0;
`;

export const Installer = () => {
	const deferredPrompt = useInstallationPrompt();

	const [shown, setShown] = useState(false);

	const onInstallClick = () => () => {
		setShown(true);
		deferredPrompt?.prompt();
	};
	const onContinueClick = () => () => setShown(true);

	return (
		<Container show={(!!deferredPrompt && !shown)}>
			<CTAContainer>
				<CTAHeader>Install Epub Reader app?</CTAHeader>
				<CTAButtons>
					<Button color={Color.WHITE} onClick={onInstallClick()}>Install</Button>
					<Button primary onClick={onContinueClick()}>Continue</Button>
				</CTAButtons>
			</CTAContainer>
		</Container>
	);
};
