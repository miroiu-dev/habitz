import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import { Container, FormInput, Spacer, Text } from '@/components/ui';
import {
	type CreateAccountSchema,
	createAccountSchema,
} from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function CreateAccount() {
	const { control, handleSubmit } = useForm<CreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			confirmPassword: '',
			email: '',
			password: '',
		},
	});

	const { push } = useRouter();

	const onSubmit: SubmitHandler<CreateAccountSchema> = data => {
		push('/(public)/(onboarding)/account-created');
	};

	return (
		<>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
				keyboardShouldPersistTaps="always"
				keyboardDismissMode="none"
				bottomOffset={80}
			>
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
							inputMode="email"
							keyboardType="email-address"
							name="email"
						/>
						<FormInput
							label="Password"
							placeholder="Enter your password"
							control={control}
							inputMode="text"
							keyboardType="visible-password"
							secureTextEntry
							name="password"
						/>
						<FormInput
							label="Confirm password"
							placeholder="Enter your password again"
							control={control}
							name="confirmPassword"
							secureTextEntry
							keyboardType="visible-password"
							inputMode="text"
						/>
					</View>

					<Spacer />
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</>
	);
}
