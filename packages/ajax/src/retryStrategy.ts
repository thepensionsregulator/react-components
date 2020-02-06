import { throwError, timer, Observable } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';
import { AjaxError } from 'rxjs/ajax';

type Props = {
	maxRetryAttempts?: number;
	scalingDuration?: number;
	excludedStatusCodes?: number[];
};

export const genericRetryStrategy = ({
	maxRetryAttempts = 3,
	scalingDuration = 1000,
	excludedStatusCodes = [],
}: Props = {}) => (attempts: Observable<AjaxError>) => {
	return attempts.pipe(
		mergeMap((error, index) => {
			const retryAttempt = index + 1;
			// if maximum number of retries have been met
			// or response is a status code we don't wish to retry, throw error
			if (
				retryAttempt > maxRetryAttempts ||
				excludedStatusCodes.find(e => e === error.status)
			) {
				return throwError(error);
			}
			console.log(
				`Attempt ${retryAttempt}: retrying in ${retryAttempt *
					scalingDuration}ms`,
			);
			// retry after 1s, 2s, etc...
			return timer(retryAttempt * scalingDuration);
		}),
		finalize(() => console.log('Retry sequence complete')),
	);
};
