import type { StyleProp, ViewStyle } from 'react-native';

export type WithClassName<T> = {
	className?: string;
	style?: StyleProp<ViewStyle>;
} & T;

export type Muscle =
	| 'neck'
	| 'leftBiceps'
	| 'rightBiceps'
	| 'chest'
	| 'abs'
	| 'leftTigh'
	| 'rightTigh'
	| 'leftCalf'
	| 'rightCalf'
	| 'shoulder'
	| 'waist'
	| 'hip';
