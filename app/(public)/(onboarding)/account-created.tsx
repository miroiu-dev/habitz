import { Button, Container, Illustration, Spacer, Text } from '@/components/ui';
import { usePreventBackButton } from '@/hooks/usePreventBackButton';
import { useSession } from '@/providers/auth-context';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountCreated() {
	const router = useRouter();
	const { closeSignupFlow } = useSession();

	usePreventBackButton();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container>
				<Text variant='title/large'>Account created</Text>
				<Text variant='title/medium' className='mt-8 mb-6'>
					Congratulations! We’ve set everything up for you and your
					needs.
				</Text>

				<Button
					title='Finish'
					className='mt-12'
					onPress={() => {
						closeSignupFlow();
						router.replace('/(auth)/(tabs)');
					}}
				/>

				<Spacer />
			</Container>
			<Spacer />
			<Illustration type='app' style={{ margin: 'auto' }} />
		</SafeAreaView>
	);
}
