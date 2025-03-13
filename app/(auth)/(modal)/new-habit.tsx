import { ColorPicker } from '@/components/new-habit/color-picker';
import { Container, Text } from '@/components/ui';
import { ScrollView, View } from 'react-native';

export default function Improve() {
	return (
		<ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
			<Container className='gap-4'>
				<View className=''>
					<Text variant='title/large'>I want to </Text>
				</View>

				<Text variant='title/large'>Iconography</Text>
				{/* <ScrollView></ScrollView> */}

				<View className='gap-3'>
					<Text variant='title/large'>Color</Text>
					<ColorPicker />
				</View>
			</Container>
		</ScrollView>
	);
}
