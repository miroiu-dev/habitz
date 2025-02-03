import {
	Button,
	Container,
	Illustration,
	Logo,
	Spacer,
	Text,
} from '@/components/ui';
import { Link } from 'expo-router';
import { Fragment } from 'react';
import { View } from 'react-native';

export default function Index() {
	return (
		<Fragment>
			<Container className="gap-2 pb-2">
				<View className="flex flex-row align-bottom gap-2">
					<Text variant="title/xlarge">Welcome to</Text>
					<Logo />
				</View>
				<Text variant="body/base">
					A uniquely tailored platform designed to help you achieve
					your personal growth goals.
				</Text>
			</Container>
			<Illustration type="watch" style={{ margin: 'auto' }} />
			<Spacer />
			<Container className="flex flex-col gap-4">
				<Link href="/(auth)/sign-up" asChild>
					<Button title="Sign up for free" />
				</Link>
				<Link href="/(auth)/log-in" asChild>
					<Button title="Log in" variant="secondary" />
				</Link>
			</Container>
		</Fragment>
	);
}
