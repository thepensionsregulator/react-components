import { of, throwError } from 'rxjs';
import { map, catchError, retryWhen, switchMap, timeout } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { genericRetryStrategy } from './retryStrategy';

const getNewTokenSuccess: any = {};
const logout: any = {};

type Config = {
	apiBase: string;
	access_token: string;
	refresh_token: string;
};

type Payload = {
	query: string;
	variables?: any;
};

type Headers = {
	[key: string]: any;
};

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

function refreshToken(config: Config, dispatch: Function) {
	return ajax({
		url: `${config.apiBase}/refresh`,
		method: 'post',
		headers: { Authorization: `Bearer ${config.refresh_token}` },
	}).pipe(
		map(resp => {
			// update redux config with the new access token
			dispatch(getNewTokenSuccess(resp.response.data));
			// pass on the access token to repeat the request
			return resp.response.data;
		}),
		retryWhen(
			genericRetryStrategy({
				maxRetryAttempts: 3,
				scalingDuration: 1250,
				excludedStatusCodes: [500],
			}),
		),
		catchError(err => {
			console.error('refresh token expired', err);
			return of(dispatch(logout()));
		}),
	);
}

const ajax$ = (
	method: Method = 'get',
	payload: Payload,
	config: Config,
	overrideHeaders?: Headers,
) => {
	return ajax({
		url: `${config.apiBase}/${payload.query}`,
		method,
		headers: {
			Authorization: `Bearer ${config.access_token}`,
			...overrideHeaders,
		},
		body: payload.variables,
	}).pipe(timeout(30000));
};

export const instance = (config: Config, dispatch: Function): Function => (
	method: Method,
	payload: Payload,
	overrideHeaders: Headers = {},
) => {
	return ajax$(method, payload, config, overrideHeaders).pipe(
		map(resp => resp),
		catchError(error => {
			// refresh token if 401 and has the access token (is logged in)
			if (error.status === 401 && config.access_token) {
				return refreshToken(config, dispatch).pipe(
					switchMap(({ access_token }) =>
						// repeat the initial request with the new token
						instance({ ...config, access_token }, dispatch)(method, payload),
					),
				);
			}
			// throw an error otherwise
			return throwError(error);
		}),
	);
};
