import { useStorageState } from '@/hooks/useStorageState';
import { tokenManager } from '@/lib/auth';
import type { SignInSchema, SignUpSchema } from '@/lib/schemas/auth';
import { signIn, signUp } from '@/lib/services/authService';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { toast } from '@/lib/toast';
import { isError } from '@/lib/typeGuards';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect
} from 'react';

type AuthContextProps = {
	signIn: (data: SignInSchema) => Promise<void>;
	signUp: (data: SignUpSchema) => Promise<void>;
	signOut: () => void;
	closeSignupFlow: () => void;
	session?: string | null;
	signupFlow: boolean;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function useSession() {
	const ctx = useContext(AuthContext);

	if (!ctx) {
		throw new Error('useSession must be wrapped in a <SessionProvider />');
	}

	return ctx;
}

export function SessionProvider({ children }: PropsWithChildren) {
	const queryClient = useQueryClient();

	const [[accessTokenLoading, accessToken], setAccessToken] =
		useStorageState('accessToken');
	const [[refreshTokenLoading, refreshToken], setRefreshToken] =
		useStorageState('refreshToken');
	const [[signupFlowLoading, signupFlow], setSignupFlow] =
		useStorageState('signupFlow');
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: setters are stable values
	useEffect(() => {
		const unsubscribe = tokenManager.subscribe(
			({ accessToken, refreshToken }) => {
				setAccessToken(accessToken);
				setRefreshToken(refreshToken);
			}
		);

		return () => unsubscribe();
	}, []);

	const reset = useOnboardingStore(state => state.reset);

	const session = accessToken && refreshToken;
	const isLoading =
		accessTokenLoading || refreshTokenLoading || signupFlowLoading;

	return (
		<AuthContext.Provider
			value={{
				signIn: async (data: SignInSchema) => {
					const response = await signIn(data);

					if (isError(response)) {
						toast.danger({
							title: response.title,
							description: response.description
						});

						return;
					}

					queryClient.clear();
					reset();
					setAccessToken(response.accessToken);
					setRefreshToken(response.refreshToken);

					await tokenManager.setTokens(
						response.accessToken,
						response.refreshToken
					);

					router.replace('/session-loading');
				},
				signUp: async (data: SignUpSchema) => {
					const response = await signUp(data);

					if (isError(response)) {
						toast.danger({
							title: response.title,
							description: response.description
						});

						return;
					}

					queryClient.clear();
					reset();
					setAccessToken(response.accessToken);
					setRefreshToken(response.refreshToken);

					await tokenManager.setTokens(
						response.accessToken,
						response.refreshToken
					);

					setSignupFlow('true');
					router.replace('/session-loading');
				},
				signOut: () => {
					setAccessToken(null);
					setRefreshToken(null);

					router.replace('/(public)');
				},
				closeSignupFlow: () => {
					setSignupFlow('false');
				},
				session,
				signupFlow: signupFlow === 'true',
				isLoading
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
