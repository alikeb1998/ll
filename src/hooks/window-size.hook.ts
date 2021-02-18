import {useEffect, useState} from 'react';

export interface WindowSize {
	width: number;
	height: number;
}

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	const handleResize = () => () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		const handleResizeFunction = handleResize();

		window.addEventListener('resize', handleResizeFunction);

		return () => window.removeEventListener('resize', handleResizeFunction);
	});

	return windowSize;
};
