import React, {FC} from 'react';
import {Color} from '../../../store/settings/types';

interface Props {
	color: Color;
}

export const Back: FC<Props> = ({color}) => (
	<svg xmlns='http://www.w3.org/2000/svg' width='10' height='20' viewBox='0 0 7.811 14.121'>
		<g transform='translate(0.75 1.061)'>
			<path d='M6,12,0,6,6,0' fill='none' stroke={color} strokeLinecap='round'
						strokeLinejoin='round' strokeMiterlimit='10' strokeWidth='1.5' />
		</g>
	</svg>
);
