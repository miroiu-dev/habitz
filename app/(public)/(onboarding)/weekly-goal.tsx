import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import {
	Container,
	FormRadioCard,
	FormRadioCardGroup,
	Text
} from '@/components/ui';
import {
	Goal,
	type WeeklyGoalSchema,
	weeklyGoalSchema
} from '@/lib/schemas/auth';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeeklyGoal() {
	const goal = useOnboardingStore(state => state.goal);
	const weeklyGoal = useOnboardingStore(state => state.weeklyGoal);
	const updateWeeklyGoal = useOnboardingStore(
		state => state.updateWeeklyGoal
	);

	const { control, handleSubmit } = useForm<WeeklyGoalSchema>({
		resolver: zodResolver(weeklyGoalSchema),
		defaultValues: {
			weeklyGoal
		}
	});

	const { push } = useRouter();

	const onSubmit: SubmitHandler<WeeklyGoalSchema> = data => {
		updateWeeklyGoal({
			weeklyGoal: data.weeklyGoal
		});

		push('/(public)/(onboarding)/you');
	};

	const type = goal === Goal.gain ? 'Gain' : 'Lose';

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAwareScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
				keyboardShouldPersistTaps='always'
				keyboardDismissMode='none'
				bottomOffset={80}
			>
				<Container className='h-full'>
					<Text variant='title/large'>Weekly goal</Text>
					<Text variant='title/medium' className='mt-8'>
						What’s your weekly goal?
					</Text>
					<FormRadioCardGroup control={control} name='weeklyGoal'>
						<View className='flex my-4 gap-4'>
							<FormRadioCard
								label={`${type} 0.25kg per week`}
								value={0.25}
							/>

							<FormRadioCard
								label={`${type} 0.5kg per week`}
								value={0.5}
							/>

							<FormRadioCard
								label={`${type} 0.75kg per week`}
								value={0.75}
							/>

							<FormRadioCard
								label={`${type} 1kg per week`}
								value={1}
							/>
						</View>
					</FormRadioCardGroup>
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</SafeAreaView>
	);
}
