export const invokeActionWithConsoleErrorTestFailureSuppressed = async (
	action: () => any,
) => {
	global['throwOnConsoleError'] = false;
	await action();
	global['throwOnConsoleError'] = true;
};
