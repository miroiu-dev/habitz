import { WaistHipRatioCard } from '@/components/body-measurements';
import { MeasurementSheet } from '@/components/body-measurements/measurement-sheet';
import { Measurements } from '@/components/body-measurements/measurements';
import {
	Button,
	Container,
	GlobalError,
	Skeleton,
	Text
} from '@/components/ui';
import { useBodyMeasurementLog } from '@/lib/queries/useBodyMeasurementLog';
import { createBodyMeasurementLog } from '@/lib/services/bodyMeasurementService';
import { useBodyMeasurementStore } from '@/lib/store/bodyMeasurementStore';
import { toast } from '@/lib/toast';
import { isError } from '@/lib/typeGuards';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function BodyMeasurement() {
	const { data, isPending, error, hasError, refetch } =
		useBodyMeasurementLog();

	const queryClient = useQueryClient();

	const setMuscleMeasurements = useBodyMeasurementStore(
		x => x.setMuscleMeasurements
	);

	useEffect(() => {
		if (!isPending && data) {
			setMuscleMeasurements(data);
		}
	}, [isPending, data, setMuscleMeasurements]);

	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const router = useRouter();

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	const handleSaveAll = async () => {
		const state = useBodyMeasurementStore.getState();

		const response = await createBodyMeasurementLog({
			abs: state.abs,
			chest: state.chest,
			hip: state.hip,
			leftBiceps: state.leftBiceps,
			leftCalf: state.leftCalf,
			leftTigh: state.leftTigh,
			neck: state.neck,
			rightBiceps: state.rightBiceps,
			rightCalf: state.rightCalf,
			rightTigh: state.rightTigh,
			shoulder: state.shoulder,
			waist: state.waist
		});

		if (isError(response)) {
			toast.danger({
				title: response.title,
				description: response.description
			});

			return;
		}

		toast.success({
			title: 'Great job tracking your measurements!'
		});

		await Promise.all([
			queryClient.invalidateQueries({
				queryKey: [
					'body-measurement-logs',
					DateTime.now().toFormat('yyyy-MM-dd')
				]
			}),
			queryClient.invalidateQueries({
				queryKey: ['body-measurement-logs/newest']
			}),
			queryClient.invalidateQueries({
				queryKey: ['statistics']
			})
		]);

		router.push('/(auth)/(body-measurement)/history');
	};

	return (
		<SafeAreaView edges={['bottom']}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				bounces={false}
				overScrollMode='never'
			>
				<Container className='pt-0 pb-0'>
					{hasError && error && (
						<GlobalError error={error} refetch={refetch} />
					)}
					<Measurements openBottomSheet={openBottomSheet} />
					<Text variant='title/medium' className='mb-2'>
						Waist - Hip Ratio
					</Text>

					{!isPending && <WaistHipRatioCard />}
					{isPending && <Skeleton width={width - 48} height={118} />}

					<Button
						title='Save all'
						className='my-6'
						disabled={isPending}
						onPress={handleSaveAll}
					/>
					<MeasurementSheet ref={bottomSheetRef} />
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
}
