import { Toast as ToastComponent } from '@/components/ui/toast';
import Toast, { type ToastConfig } from 'react-native-toast-message';

type ToastParams = {
	title: string;
	description?: string;
	actionText?: string;
	action?: () => void;
	autoHide?: boolean;
	position?: 'top' | 'bottom';
	topOffset?: number;
	bottomOffset?: number;
	swipable?: boolean;
};

export const toastConfig: ToastConfig = {
	success: props => <ToastComponent {...props} />,
	error: props => <ToastComponent {...props} />
};

function danger(params: ToastParams) {
	Toast.show({
		text1: params.title,
		text2: params.description,
		position: params.position,
		autoHide: params.autoHide,
		type: 'error',
		swipeable: params.swipable ?? false,
		visibilityTime: 2000,
		topOffset: params.topOffset ?? 32,
		bottomOffset: params.bottomOffset ?? 32,
		props: {
			actionText: params.actionText,
			action: params.action
		}
	});
}

function success(params: ToastParams) {
	Toast.show({
		text1: params.title,
		text2: params.description,
		position: params.position,
		autoHide: params.autoHide,
		type: 'success',
		swipeable: params.swipable ?? false,
		visibilityTime: 2000,
		topOffset: params.topOffset ?? 32,
		bottomOffset: params.bottomOffset ?? 32,
		props: {
			actionText: params.actionText,
			action: params.action
		}
	});
}

export const toast = {
	danger,
	success
};
