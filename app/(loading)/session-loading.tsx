import { Container, Text } from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import { usePreventBackButton } from '@/hooks/usePreventBackButton';
import { useSession } from '@/providers/auth-context';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SessionLoading() {
	usePreventBackButton();
	const { session, isLoading, signupFlow } = useSession();
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: router is a stable refrence
	useEffect(() => {
		if (!isLoading) {
			if (session && signupFlow) {
				router.replace('/(public)/(onboarding)/account-created');
			} else if (session && !signupFlow) {
				router.replace('/(auth)/(tabs)');
			} else if (!session) {
				router.replace('/(public)');
			}
		}
	}, [isLoading, session, signupFlow]);

	return (
		<SafeAreaView>
			<Container className='gap-2'>
				<Text variant='title/xlarge' className='text-center'>
					Almost there
				</Text>
				<Text variant='body/large' className='text-center mb-8'>
					Just confirming your session is active.
				</Text>
				<ActivityIndicator size={64} color={ColorsLight.primary[10]} />
			</Container>
		</SafeAreaView>
	);
}
