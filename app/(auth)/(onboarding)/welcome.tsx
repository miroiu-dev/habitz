import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import {
	Container,
	FormInput,
	FormRadioCard,
	FormRadioCardGroup,
	Text,
} from '@/components/ui';
import { useFormNavigation } from '@/hooks';
import { type WelcomeSchema, welcomeSchema } from '@/lib/schemas/auth';
import { useOnboardingStore } from '@/lib/store/onboarding-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function Onboarding() {
	const age = useOnboardingStore(state => state.age);
	const fullName = useOnboardingStore(state => state.fullName);
	const gender = useOnboardingStore(state => state.gender);
	const updateWelcomeData = useOnboardingStore(
		state => state.updateWelcomeData
	);

	const { control, handleSubmit } = useForm<WelcomeSchema>({
		resolver: zodResolver(welcomeSchema),
		defaultValues: {
			age,
			fullName,
			gender,
		},
	});

	const { push } = useRouter();
	const { register } = useFormNavigation();

	const onSubmit: SubmitHandler<WelcomeSchema> = data => {
		updateWelcomeData({
			age: data.age,
			fullName: data.fullName,
			gender: data.gender,
		});

		push('/(auth)/(onboarding)/goal');
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
					<Text variant="title/large">Welcome</Text>
					<Text variant="title/medium" className="mt-8">
						What can we call you?
					</Text>
					<Text className="mt-1 mb-4">
						We’d like to get to know you.
					</Text>

					<FormInput
						placeholder="Enter your full name"
						control={control}
						name="fullName"
						className=""
						{...register()}
					/>

					<Text variant="title/medium" className="mt-8">
						Tell us a little about yourself.
					</Text>
					<Text>
						Please select which gender we should use to calculate
						your calories needs.
					</Text>

					<FormRadioCardGroup control={control} name="gender">
						<View className="flex flex-row my-4 gap-4">
							<FormRadioCard value="male" label="Male" />
							<FormRadioCard value="female" label="Female" />
						</View>
					</FormRadioCardGroup>

					<FormInput
						label="How old are you?"
						placeholder="Enter your age"
						control={control}
						inputMode="numeric"
						name="age"
						maxLength={2}
						{...register(true)}
					/>
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</>
	);
}
