import {
	Button,
	Container,
	GlobalError,
	Skeleton,
	Spacer,
	Text
} from '@/components/ui';
import { ColorsLight } from '@/constants/Colors';
import { useUser } from '@/lib/queries';
import { useSession } from '@/providers/auth-context';
import { Image } from 'expo-image';
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
	const { signOut } = useSession();
	const { data, isError, error, isPending, refetch } = useUser();

	return (
		<SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
			<Container className='flex-1 relatives'>
				{isError && error && (
					<GlobalError error={error} refetch={refetch} />
				)}
				<View className='justify-center items-center'>
					{isPending && (
						<>
							<Skeleton
								borderRadius={9999}
								height={64}
								width={64}
								backgroundColor={ColorsLight.neutral[20]}
								style={{
									marginBottom: 8
								}}
							/>

							<Skeleton
								borderRadius={8}
								height={16}
								width={220}
								backgroundColor={ColorsLight.neutral[20]}
								style={{
									marginBottom: 8
								}}
							/>
							<Skeleton
								borderRadius={8}
								height={16}
								width={120}
								backgroundColor={ColorsLight.neutral[20]}
							/>
						</>
					)}
					{data && !isError && !isPending && (
						<>
							<Image
								style={stylesheet.avatar}
								source={require('@/assets/images/avatar.png')}
							/>

							<Text variant='title/medium' className='mb-1'>
								{data.fullName}
							</Text>
							<Text className='text-neutral-40'>
								{data.email}
							</Text>
						</>
					)}
				</View>

				<Spacer />

				<Button title='Log out' onPress={signOut} />
			</Container>
		</SafeAreaView>
	);
}
