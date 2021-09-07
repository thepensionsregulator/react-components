interface CardAddress {
	addressLine1: string;
	addressLine2: string;
	addressLine3: string;
	postTown: string;
	postcode: string;
	county: string;
	country: string;
	countryId: number;
}

export const sampleAddress: CardAddress = {
	addressLine1: 'THE PENSIONS REGULATOR',
	addressLine2: 'NAPIER HOUSE',
	addressLine3: 'TRAFALGAR PL',
	postTown: 'BRIGHTON',
	postcode: 'BN1 4DW',
	county: 'EAST SUSSEX',
	country: 'UK',
	countryId: 2,
};
