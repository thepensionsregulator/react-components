export const RestoreMissingNullValues = (original: any, updated: any) => {
	for (var field in original) {
		if (updated[field] === undefined) {
			updated[field] = null;
		}
	}
};
