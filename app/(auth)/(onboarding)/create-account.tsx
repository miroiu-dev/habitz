import {
	Button,
	Container,
	FormInput,
	IconButton,
	Spacer,
	Text,
} from '@/components/ui';
import { useNavigation } from 'expo-router';
import {
	type FieldValues,
	type UseFormHandleSubmit,
	useForm,
} from 'react-hook-form';
import { View } from 'react-native';

export default function CreateAccount() {
	const { control } = useForm();

	return (
		<Container className="h-full">
			<Text variant="title/large">Create account</Text>

			<Text variant="title/medium" className="mt-8 mb-6">
				Almost done! Create your account.
			</Text>

			<View className="flex gap-4">
				<FormInput
					label="Email address"
					placeholder="Enter your email"
					control={control}
					name="fullName"
				/>
				<FormInput
					label="Password"
					placeholder="Enter your password"
					control={control}
					name="fullName"
				/>
				<FormInput
					label="Confirm password"
					placeholder="Enter your password again"
					control={control}
					name="fullName"
				/>
			</View>

			<Spacer />
		</Container>
	);
}
