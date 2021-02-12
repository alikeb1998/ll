import React, { FC } from 'react';
import { Color } from '../../../store/settings/types';

interface Props {
  color: Color;
}

export const Back: FC<Props> = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="7.811" height="14.121" viewBox="0 0 7.811 14.121">
    <g id="chevron-left" transform="translate(0.75 1.061)">
      <path id="Path" d="M6,12,0,6,6,0" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" />
    </g>
  </svg>
);
