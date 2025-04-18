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

export type AuthenticationResponse = {
	accessToken: string;
	refreshToken: string;
};

type ValidationError = {
	code: string;
	description: string;
	type: number;
};

export type ErrorResponse = {
	title: string;
	detail: string;
	type: string;
	status: number;
	errors?: ValidationError[];
};

export type ApiError = {
	title: string;
	description: string;
	status: number;
};

export type ApiReponse<T> = T | ApiError;

export type User = {
	id: number;
	email: string;
	fullName: string;
};

export type Duration = {
	hours: number;
	minutes: number;
	seconds: number;
};
