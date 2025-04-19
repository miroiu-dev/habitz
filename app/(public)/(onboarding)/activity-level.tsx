import { OnboardingActions } from '@/components/onboarding/onboarding-actions';
import {
	Container,
	FormRadioCard,
	FormRadioCardGroup,
	Text
} from '@/components/ui';
import {
	type ActivityLevelSchema,
	Goal,
	activityLevelSchema
} from '@/lib/schemas/auth';
import { useOnboardingStore } from '@/lib/store/onboardingStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityLevel() {
	const activityLevel = useOnboardingStore(state => state.activityLevel);
	const goal = useOnboardingStore(state => state.goal);
	const updateActivityLevel = useOnboardingStore(
		state => state.updateActivityLevel
	);
	const updateWeeklyGoal = useOnboardingStore(
		state => state.updateWeeklyGoal
	);

	const { control, handleSubmit } = useForm<ActivityLevelSchema>({
		resolver: zodResolver(activityLevelSchema),
		defaultValues: {
			activityLevel
		}
	});

	const { push } = useRouter();

	const onSubmit: SubmitHandler<ActivityLevelSchema> = data => {
		updateActivityLevel({
			activityLevel: data.activityLevel
		});

		if (goal === Goal.maintain) {
			push('/(public)/(onboarding)/you');
			return;
		}

		updateWeeklyGoal({ weeklyGoal: 0.25 });
		push('/(public)/(onboarding)/weekly-goal');
	};

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
					<Text variant='title/large'>Activity level</Text>

					<Text variant='title/medium' className='mt-8'>
						What is your baseline activity level?
					</Text>
					<Text className='mt-1'>
						Not including workouts — we count that separately.
					</Text>

					<FormRadioCardGroup name='activityLevel' control={control}>
						<View className='flex my-4 gap-4'>
							<FormRadioCard
								value={0}
								label='Not very active'
								description='Spend most of the day sitting (e.g bankteller, desk job).'
							/>

							<FormRadioCard
								value={1}
								label='Lightly active'
								description='Spend a good part of the day on your feet (e,g teacher).'
							/>

							<FormRadioCard
								value={2}
								label='Active'
								description='Spend a good part of the day doing some physical activity.'
							/>

							<FormRadioCard
								value={3}
								label='Very active'
								description='Spend a good part of the day doing heavy physical activity.'
							/>
						</View>
					</FormRadioCardGroup>
				</Container>
			</KeyboardAwareScrollView>
			<OnboardingActions onSubmit={handleSubmit(onSubmit)} />
		</SafeAreaView>
	);
}
