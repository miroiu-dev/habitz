import { env } from '@utils/env';
import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import ky from 'ky';
import { Platform } from 'react-native';

export const getServerUrl = (path: string) => {
	if (isDevice) {
		const debuggerHost = Constants.expoConfig?.hostUri;
		const localhost = debuggerHost?.split(':')[0];
		if (!localhost) {
			return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
		}
		// in case EXPO_PUBLIC_API_URL points to preview (staging) backend
		if (!env.EXPO_PUBLIC_API_URL?.includes('localhost')) {
			return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
		}
		return `http://${localhost}:3000/api/${path}`;
	}
	// sim
	if (
		env.EXPO_PUBLIC_API_URL.includes('localhost') &&
		Platform.OS === 'android'
	) {
		return `http://10.0.2.2:3000/api/${path}`;
	}
	return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
};

export const client = ky.create({ prefixUrl: 'https://example.com/api' });
