import { Button, Container, Illustration, Spacer, Text } from '@/components/ui';

export default function AccountCreated() {
	return (
		<Container className="h-full">
			<Text variant="title/large">Account created</Text>
			<Text variant="title/medium" className="mt-8 mb-6">
				Congratulations! We’ve set everything up for you and your needs.
			</Text>

			<Button title="Finish" className="mt-12" />
			<Spacer />
			<Illustration type="app" style={{ marginLeft: -30 }} />
		</Container>
	);
}
