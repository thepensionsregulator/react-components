import { Address } from '../types';

export const AddressComparer = {
	areEqual: (address1: Address, address2: Address): boolean => {
		// Use == because an address is the same address if it's undefined on one side and null or empty string on the other
		return (
			address1 &&
			address2 &&
			address1.addressLine1 == address2.addressLine1 &&
			address1.addressLine2 == address2.addressLine2 &&
			address1.addressLine3 == address2.addressLine3 &&
			address1.postTown == address2.postTown &&
			address1.county == address2.county &&
			address1.postcode == address2.postcode &&
			address1.nationId == address2.nationId &&
			address1.country == address2.country &&
			address1.countryId == address2.countryId &&
			address1.uprn == address2.uprn
		);
	},
};
