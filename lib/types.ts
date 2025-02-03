import type { StyleProp, ViewStyle } from 'react-native';

export type WithClassName<T> = {
	className?: string;
	style?: StyleProp<ViewStyle>;
} & T;
