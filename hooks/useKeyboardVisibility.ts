import { useSyncExternalStore } from 'react';
import { Keyboard } from 'react-native';

const getSnapshot = () => Keyboard.isVisible();

const subscribe = (callback: () => void) => {
	const showSub = Keyboard.addListener('keyboardDidShow', callback);
	const hideSub = Keyboard.addListener('keyboardDidHide', callback);

	return () => {
		showSub.remove();
		hideSub.remove();
	};
};

export function useKeyboardVisibility() {
	return useSyncExternalStore(subscribe, getSnapshot);
}
