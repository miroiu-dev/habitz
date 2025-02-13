import { ActionPresentationCard, Container, Text } from '@/components/ui';
import { ScrollView, View } from 'react-native';

export default function Improve() {
	return (
		<ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
			<Container className="gap-8">
				<View>
					<Text variant="title/large" className="mb-2">
						Workout
					</Text>
					<Text className="mb-6">
						Kickstart a workout session to burn additional calories
						and boost your overall well-being.
					</Text>
					<ActionPresentationCard
						icon="fire"
						title="Start"
						illustration="award-sm"
					/>
				</View>
				<View>
					<Text variant="title/large" className="mb-2">
						Habit
					</Text>
					<Text className="mb-6">
						Incorporate a new habit to enhance productivity and
						accomplish your goals.
					</Text>
					<ActionPresentationCard
						icon="fire"
						illustration="moment-sm"
						title="Add"
					/>
				</View>
				<View>
					<Text variant="title/large" className="mb-2">
						Meditate
					</Text>
					<Text className="mb-6">
						Take a moment to relax and restore your mental clarity
						through a brief meditation.
					</Text>
					<ActionPresentationCard
						icon="fire"
						illustration="aurora-sm"
						title="Begin"
					/>
				</View>
			</Container>
		</ScrollView>
	);
}
