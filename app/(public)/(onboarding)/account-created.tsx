import { Button, Container, Illustration, Spacer, Text } from '@/components/ui';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountCreated() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Container className="h-full">
				<Text variant="title/large">Account created</Text>
				<Text variant="title/medium" className="mt-8 mb-6">
					Congratulations! We’ve set everything up for you and your
					needs.
				</Text>

				<Button title="Finish" className="mt-12" />
				<Spacer />
			</Container>
			<Spacer />
			<Illustration type="app" style={{ margin: 'auto' }} />
		</SafeAreaView>
	);
}
