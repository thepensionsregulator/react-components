import { Address } from './Address';

export interface AddressLookupProvider {
	lookupAddress(postcode: string, limit?: number): Promise<any>;
	transformResults: (response: any) => Promise<Address[]>;
}
