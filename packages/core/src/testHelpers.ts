export const sleep = (millisecondsToSleep): Promise<unknown> => {
	return new Promise((resolve) => setTimeout(resolve, millisecondsToSleep));
};
