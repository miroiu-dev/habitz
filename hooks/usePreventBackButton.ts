import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function usePreventBackButton() {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				return true;
			}
		);

		return () => backHandler.remove();
	}, []);
}
