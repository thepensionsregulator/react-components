import { AddressLookupProvider } from './addressLookupProvider';

class FakeAddressLookupProvider implements AddressLookupProvider {
	constructor() {}
	lookupAddress(): Promise<any> {
		return Promise.resolve([
			{
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
			},
			{
				addressLine1: 'Financial Conduct Authority',
				addressLine2: '12 Endeavour Square',
				postTown: 'London',
				postcode: 'E20 1JN',
				country: 'UK',
				countryId: 229,
				uprn: 10093129234,
			},
			{
				addressLine1: 'Pension Protection Fund',
				addressLine3: '12 Dingwall Road',
				postTown: 'Croydon',
				postcode: 'CR0 2NA',
				country: 'UK',
				countryId: 229,
				uprn: 10091767168,
			},
		]);
	}
	transformResults(response) {
		return Promise.resolve(response);
	}
}

export default FakeAddressLookupProvider;
