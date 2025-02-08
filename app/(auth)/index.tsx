import {
	Button,
	Container,
	Illustration,
	Logo,
	Spacer,
	Text,
} from '@/components/ui';
import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
	return (
		<>
			<Container className="gap-2 pb-2">
				<View className="flex flex-row align-bottom gap-2">
					<Text variant="title/xlarge">Welcome to</Text>
					<View className="relative">
						<Text variant="title/xlarge" className="z-10">
							habitz
						</Text>
						<View className="w-[83px] h-9 bg-primary-20 absolute top-0.5 -left-0.5" />
					</View>
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
		</>
	);
}
