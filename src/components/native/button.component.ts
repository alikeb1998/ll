import React from 'react';
import styled from 'styled-components';

interface Props {
	size?: number;
}

export const Button = styled.div<Props>`
	padding: 10px 20px;
	font-size: ${({size = 0}) => 14 + size * 2}px;
`;
