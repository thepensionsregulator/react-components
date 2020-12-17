import { Address } from './address';

export interface AddressLookupProvider {
	lookupAddress(postcode: string, limit?: number): Promise<any>;
	transformResults: (response: any) => Promise<Address[]>;
}
