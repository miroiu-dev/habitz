import { Button, Container, Illustration, Spacer, Text } from '@/components/ui';
import { Link } from 'expo-router';
import { Fragment } from 'react';

export default function SignUp() {
	return (
		<Fragment>
			<Container>
				<Text variant="title/medium">
					Let’s customize Habitz to help you achieve your goals.
				</Text>
				<Link href="/(public)/(onboarding)/welcome" asChild>
					<Button title="Continue" className="mt-12" />
				</Link>
			</Container>
			<Spacer />
			<Illustration type="aurora" style={{ margin: 'auto' }} />
		</Fragment>
	);
}
