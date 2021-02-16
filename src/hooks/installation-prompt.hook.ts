import {useEffect, useState} from 'react';

export interface BeforeInstallPromptEvent {
	prompt: () => Promise<void>;
}

export const useInstallationPrompt = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

	useEffect(() => {
		window.addEventListener('beforeinstallprompt' as any, (event: BeforeInstallPromptEvent) => {
			setDeferredPrompt(event);
		});
	}, []);

	return deferredPrompt;
};
