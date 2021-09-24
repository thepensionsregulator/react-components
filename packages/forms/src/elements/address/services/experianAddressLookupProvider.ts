import { Address } from '../types';
import { AddressLookupProvider } from '../types/AddressLookupProvider';

export type AddressAPIType = {
	/** API instance with auth to get a list of addresses */
	get: (endpoint: string) => Promise<any>;
	/** limit of items to display per search */
	limit: number;
};

export class ExperianAddressLookupProvider implements AddressLookupProvider {
	private addressApi;

	public constructor(addressApi: AddressAPIType) {
		this.addressApi = addressApi;
	}

	public lookupAddress(postcode: string, limit = 50): Promise<any> {
		return this.addressApi.get(
			`search?country=GBR&query=${postcode}&take=${limit}`,
		);
	}

	public transformResults(response: { data: any }): Promise<Address[]> {
		if (
			response &&
			Array.isArray(response.data.results) &&
			response.data.results.length > 0
		) {
			return Promise.all(
				response.data.results.map(({ format }: { format: string }) => {
					const [url] = format.split('v2/').slice(-1);
					return this.addressApi.get(url).then(({ data }) => {
						const addressObject = this.extractToObject(data.address);

						const addressToOurFormat = {
							addressLine1: addressObject.addressLine1 || '',
							addressLine2: addressObject.addressLine2 || '',
							addressLine3: addressObject.addressLine3 || '',
							postTown: addressObject.locality || '',
							postcode: addressObject.postalCode || '',
							county: addressObject.province || '',
							country: addressObject.country || '',
						};

						return addressToOurFormat;
					});
				}),
			);
		} else {
			return Promise.resolve([]);
		}
	}

	private extractToObject(address: object[] = []): { [key: string]: string } {
		return address.reduce((acc: any, val: any) => {
			const [key] = Object.keys(val);
			if (key) {
				return {
					...acc,
					[key]: val[key],
				};
			} else {
				return acc;
			}
		}, {});
	}
}

export default ExperianAddressLookupProvider;
