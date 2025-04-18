import {
	ColorPicker,
	FormStep,
	IconPicker,
	NameInput,
	Reminder,
	SchedulePicker
} from '@/components/new-habit';
import { Button, Container, Text } from '@/components/ui';
import {
	type HabitSchema,
	habitSchema
} from '@/lib/schemas/habits/habitSchema';
import { createHabit } from '@/lib/services/habitService';
import { toast } from '@/lib/toast';
import { isError } from '@/lib/typeGuards';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewHabit() {
	const {
		control,
		handleSubmit,
		formState: { isSubmitting }
	} = useForm<HabitSchema>({
		resolver: zodResolver(habitSchema),
		defaultValues: {
			color: '#FF995F',
			icon: 'clock',
			name: '',
			schedules: [],
			reminder: null
		}
	});

	const router = useRouter();
	const queryClient = useQueryClient();

	const onSubmit: SubmitHandler<HabitSchema> = async values => {
		const response = await createHabit({
			color: values.color,
			icon: values.icon,
			name: values.name,
			reminder: values.reminder,
			schedules: values.schedules
		});

		if (isError(response)) {
			toast.danger({
				title: response.title,
				description: response.description
			});

			return;
		}

		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: ['habit-logs']
			}),
			queryClient.invalidateQueries({
				queryKey: ['habit-logs/history']
			})
		]);

		toast.success({
			title: 'Great job starting a new habit!'
		});

		router.replace('/(auth)/(tabs)');
	};

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode='never'
			>
				<Container className='flex-1 gap-20'>
					<View className='relative gap-6 mt-5'>
						<View className='absolute -top-10'>
							<FormStep text='01' />
						</View>
						<NameInput
							control={control}
							name='name'
							keyboardType='default'
						/>
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='02' />
						</View>
						<Text variant='title/large'>Iconography</Text>
						<IconPicker control={control} name='icon' />
					</View>
					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='03' />
						</View>
						<Text variant='title/large'>Colors</Text>
						<ColorPicker control={control} name='color' />
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='04' />
						</View>
						<Text variant='title/large'>Schedule</Text>
						<SchedulePicker control={control} name='schedules' />
					</View>

					<View className='relative gap-6'>
						<View className='absolute -top-10'>
							<FormStep text='05' />
						</View>
						<Text variant='title/large'>Reminder</Text>
						<Reminder name='reminder' control={control} />
					</View>

					<Button
						title='Start new habit'
						className='-mt-8'
						onPress={handleSubmit(onSubmit)}
						disabled={isSubmitting}
					/>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
