export function getBodyMassIndex(weight: number, height: number) {
	return weight / (height * height);
}

export function getMinimumWeight(height: number) {
	return Math.round(18.5 * height * height);
}

export function isUnderweight(bmi: number) {
	return bmi < 18.5;
}

export function isNormalWeight(bmi: number) {
	return bmi >= 18.5 && bmi < 24.9;
}

export function isOverweight(bmi: number) {
	return bmi >= 25 && bmi < 29.9;
}
