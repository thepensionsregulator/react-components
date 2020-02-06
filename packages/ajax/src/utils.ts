import qs from 'qs';

export function stringifyEndpoint(
	method: 'get' | 'post',
	endpoint: string,
	variables?: object | undefined,
) {
	if (method.toLowerCase() === 'get') {
		return variables ? `${endpoint}?${qs.stringify(variables)}` : endpoint;
	}
	return endpoint;
}
