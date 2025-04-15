import { QueryError } from '../errors';
import { httpClient } from '../httpClient';
import type { SignInSchema, SignUpSchema } from '../schemas/auth';
import type { AuthenticationResponse, User } from '../types';
import { formatError } from '../utils';

export async function signIn(payload: SignInSchema) {
	try {
		const response = await httpClient.post<AuthenticationResponse>(
			'users/sign-in',
			{
				json: payload
			}
		);

		return await response.json();
	} catch (error) {
		return await formatError(error);
	}
}

export async function signUp(payload: SignUpSchema) {
	try {
		const response = await httpClient.post<AuthenticationResponse>(
			'users/sign-up',
			{
				json: payload
			}
		);

		return await response.json();
	} catch (error) {
		return await formatError(error);
	}
}

export async function getUser() {
	try {
		const response = await httpClient.get<User>('users/me');
		throw new QueryError('test', 'test description');

		return await response.json();
	} catch (error) {
		const { title, description } = await formatError(error);

		throw new QueryError(title, description);
	}
}
