import {
	CaloriesCard,
	HabitList,
	HomeHeader,
	MacrosCard,
} from '@/components/home';
import { Carousel, Container, RulerPicker, Text } from '@/components/ui';
import { getTimeOfDay } from '@/lib/time';
import { Link } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Home() {
	// const timeOfDay = getTimeOfDay();

	return (
		<>
			<RulerPicker initialValue={2.4} />
			{/* <ScrollView
				showsVerticalScrollIndicator={false}
				overScrollMode="never"
			>
				<Container>
					<HomeHeader />
					<Text variant="title/xlarge" className="mb-8">
						Good {timeOfDay}
					</Text>
					<Link href="/body-composition">asd</Link>
					<Carousel>
						<CaloriesCard />
						<MacrosCard />
					</Carousel>
				</Container>
				<HabitList />
			</ScrollView> */}
		</>
	);
}
