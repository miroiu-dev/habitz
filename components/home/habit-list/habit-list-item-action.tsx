import { Icon } from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import type { QueryError } from '@/lib/errors';
import {
	type HabitLog,
	type LogHabitResponse,
	logHabit
} from '@/lib/services/habitService';
import { toast } from '@/lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pressable } from 'react-native';
import type { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import Animated, {
	useAnimatedStyle,
	type SharedValue
} from 'react-native-reanimated';

const dragOffset = 80;

type HabitListItemActionProps = {
	progress: SharedValue<number>;
	drag: SharedValue<number>;
	swipeable: SwipeableMethods;
	id: number;
	close: () => void;
	icon: Icon;
	backgroundColor: string;
	isCompleted: boolean;
	canMutate: boolean;
	habitId: number;
};

export function HabitListItemAction({
	drag,
	id,
	close,
	icon,
	backgroundColor,
	isCompleted,
	canMutate,
	habitId
}: HabitListItemActionProps) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX:
						drag.value + (isCompleted ? -dragOffset : dragOffset)
				}
			]
		};
	});

	const queryClient = useQueryClient();
	const { mutateAsync, isPending } = useMutation<
		LogHabitResponse,
		QueryError,
		{ id: number; isCompleted: boolean },
		{ previousData: HabitLog[] }
	>({
		mutationFn: ({ id, isCompleted }) => logHabit(id, isCompleted),
		onMutate: async ({ id, isCompleted }) => {
			await Promise.all([
				queryClient.cancelQueries({
					queryKey: ['habit-logs']
				}),
				queryClient.cancelQueries({
					queryKey: ['habit-logs/statistics']
				})
			]);

			const previousData =
				queryClient.getQueryData<HabitLog[]>(['habit-logs']) ?? [];

			queryClient.setQueryData(['habit-logs'], (old: HabitLog[]) => {
				return old?.map((habit: HabitLog) =>
					habit.id === id ? { ...habit, isCompleted } : habit
				);
			});

			return { previousData };
		},
		onError: (err, variables, context) => {
			close();

			queryClient.setQueryData(
				['habit-logs'],
				context?.previousData ?? []
			);

			toast.danger({
				title: err.title,
				description: err.description
			});
		},
		onSettled: async () => {
			close();

			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ['habits', habitId]
				}),
				queryClient.invalidateQueries({
					queryKey: ['habit-logs/history']
				})
			]);
		}
	});

	return (
		<Pressable
			disabled={!canMutate || isPending}
			onPress={() => {
				mutateAsync({
					id,
					isCompleted
				});
			}}
		>
			<Animated.View
				style={[
					styleAnimation,
					{
						backgroundColor:
							!canMutate || isPending
								? ColorsLight.neutral[30]
								: backgroundColor
					}
				]}
				className='flax items-center justify-center w-20 h-full'
			>
				<Icon type={icon} width={32} height={32} />
			</Animated.View>
		</Pressable>
	);
}
