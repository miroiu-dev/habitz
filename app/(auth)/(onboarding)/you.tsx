import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import { Container, FormInput, Text } from '@/components/ui';
import { useFormNavigation } from '@/hooks';
import type { YouSchema } from '@/lib/schemas/auth';
import {
	type YouWithGoalSchema,
	youWithGoalSchema,
} from '@/lib/schemas/auth/onboarding/youSchema';
import { useOnboardingStore } from '@/lib/store/onboarding-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function You() {
	const weight = useOnboardingStore(state => state.weight);
	const goalWeight = useOnboardingStore(state => state.goalWeight);
	const height = useOnboardingStore(state => state.height);
	const goal = useOnboardingStore(state => state.goal);
	const updateYou = useOnboardingStore(state => state.updateYou);

	const { control, handleSubmit } = useForm<YouWithGoalSchema>({
		resolver: zodResolver(youWithGoalSchema),
		defaultValues: {
			goalWeight,
			height,
			weight,
			goal,
		},
	});

	const { register } = useFormNavigation();

	const { push } = useRouter();

	const onSubmit: SubmitHandler<YouSchema> = data => {
		updateYou({
			goalWeight: data.goalWeight,
			height: data.height,
			weight: data.weight,
		});

		push('/(auth)/(onboarding)/create-account');
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
					<Text variant="title/large">You</Text>

					<Text variant="title/medium" className="mt-8 mb-6">
						Just a few more questions.
					</Text>

					<View className="flex gap-4">
						<FormInput
							label="How tall are you?"
							placeholder="Enter your height"
							control={control}
							name="height"
							inputMode="numeric"
							{...register()}
						/>
						<FormInput
							label="How much do you weigh?"
							placeholder="Enter your weight"
							control={control}
							name="weight"
							inputMode="numeric"
							{...register()}
						/>
						{goal !== 'maintain' && (
							<FormInput
								label="What's your goal weight?"
								placeholder="Enter your goal weight"
								control={control}
								name="goalWeight"
								keyboardType="numeric"
								inputMode="numeric"
								{...register(true)}
							/>
						)}
					</View>
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</>
	);
}
