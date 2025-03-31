import ky from 'ky';
import type { LoginSchema } from '../schemas/auth';

export class AuthService {
	public signIn(payload: LoginSchema) {
		ky.post();
	}
}
