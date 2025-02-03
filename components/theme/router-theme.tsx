import { DefaultTheme } from '@react-navigation/native';

export const LightTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#ffffff',
		primary: 'rgb(255, 45, 85)',
	},
};
