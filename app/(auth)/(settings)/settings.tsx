import { Button, Container, Spacer, Text } from '@/components/ui';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stylesheet = StyleSheet.create({
	avatar: {
		width: 64,
		height: 64,
		marginBottom: 8
	}
});

export default function Settings() {
	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<Container className='flex-1'>
				<View className='justify-center items-center'>
					<Image
						style={stylesheet.avatar}
						source={require('@/assets/images/avatar.png')}
					/>
					<Text variant='title/medium' className='mb-1'>
						Miroiu Gabriel
					</Text>
					<Text className='text-neutral-40'>
						miroiugabriel1231@gmail.com
					</Text>
				</View>

				<Spacer />
				<Link asChild href='/(public)'>
					<Button title='Log out' />
				</Link>
			</Container>
		</SafeAreaView>
	);
}
