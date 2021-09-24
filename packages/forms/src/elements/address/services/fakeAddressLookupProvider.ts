import { AddressLookupProvider } from '../types/AddressLookupProvider';

class FakeAddressLookupProvider implements AddressLookupProvider {
	public static tprAddress = {
		addressLine1: 'Napier House',
		addressLine2: 'Trafalgar Place',
		addressLine3: 'Trafalgar Road',
		postTown: 'Brighton',
		county: 'East Sussex',
		postcode: 'BN1 4DW',
		nationId: 1,
		country: 'UK',
		countryId: 229,
		uprn: 22063565,
	};

	public static fcaAddress = {
		addressLine1: 'Financial Conduct Authority',
		addressLine2: '12 Endeavour Square',
		postTown: 'London',
		postcode: 'E20 1JN',
		country: 'UK',
		countryId: 229,
		uprn: 10093129234,
	};

	public static ppfAddress = {
		addressLine1: 'Pension Protection Fund',
		addressLine3: '12 Dingwall Road',
		postTown: 'Croydon',
		postcode: 'CR0 2NA',
		country: 'UK',
		countryId: 229,
		uprn: 10091767168,
	};

	constructor() {}
	lookupAddress(postcode): Promise<any> {
		var matchedAddresses = [];

		if (postcode === FakeAddressLookupProvider.tprAddress.postcode)
			matchedAddresses.push(FakeAddressLookupProvider.tprAddress);
		if (postcode === FakeAddressLookupProvider.fcaAddress.postcode)
			matchedAddresses.push(FakeAddressLookupProvider.fcaAddress);
		if (postcode === FakeAddressLookupProvider.ppfAddress.postcode)
			matchedAddresses.push(FakeAddressLookupProvider.ppfAddress);

		if (matchedAddresses.length === 0) {
			return Promise.resolve([
				FakeAddressLookupProvider.tprAddress,
				FakeAddressLookupProvider.fcaAddress,
				FakeAddressLookupProvider.ppfAddress,
			]);
		}

		return Promise.resolve(matchedAddresses);
	}

	transformResults(response) {
		return Promise.resolve(response);
	}
}

export default FakeAddressLookupProvider;
