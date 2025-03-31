import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Icon, Logo } from '../ui';

const stylesheet = StyleSheet.create({
	avatar: {
		width: 48,
		height: 48
	}
});

export function HomeHeader() {
	return (
		<View className='flex flex-row justify-between items-center mb-6'>
			<Link href='/(auth)/(settings)/settings' asChild>
				<TouchableOpacity>
					<Image
						style={stylesheet.avatar}
						source={require('@/assets/images/avatar.png')}
					/>
				</TouchableOpacity>
			</Link>
			<Logo />

			<TouchableOpacity>
				<Badge>
					<Icon type='bell' />
				</Badge>
			</TouchableOpacity>
		</View>
	);
}
