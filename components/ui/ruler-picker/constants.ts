import { Dimensions, PixelRatio } from 'react-native';

export const scale = PixelRatio.get();
export const spacing = Math.round(8 * scale) / scale;
export const rulerWidth = Math.round(4 * scale) / scale;
export const itemSize = Math.round((rulerWidth + spacing) * scale) / scale;
export const { width } = Dimensions.get('window');
