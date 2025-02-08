import {
	CaloriesCard,
	HabitList,
	HomeHeader,
	MacrosCard,
} from '@/components/home';
import { Container, Text } from '@/components/ui';
import { Carousel } from '@/components/ui/carousel';
import { getTimeOfDay } from '@/lib/time';

export default function Index() {
	const timeOfDay = getTimeOfDay();

	return (
		<>
			<Container>
				<HomeHeader />
				<Text variant="title/xlarge" className="mt-6 mb-8">
					Good {timeOfDay}
				</Text>
				<Carousel>
					<CaloriesCard />
					<MacrosCard />
					<CaloriesCard />
					<MacrosCard />
				</Carousel>
			</Container>
			<HabitList />
		</>
	);
}
