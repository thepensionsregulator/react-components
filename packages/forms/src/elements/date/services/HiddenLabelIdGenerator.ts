export const HiddenLabelIdGenerator = (hiddenLabel: string): string | null =>
	hiddenLabel !== ''
		? `hiddenLabel-${hiddenLabel.replace(/\s/g, '').slice(-4)}`
		: null;
