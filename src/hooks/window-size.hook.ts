import {useState} from 'react';

export interface WindowSize {
	width: number;
	height: number;
}

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const handleResize = () => setWindowSize({
		width: window.innerWidth,
		height: window.innerHeight
	});

	window.addEventListener('resize', handleResize);

	return windowSize;
};
