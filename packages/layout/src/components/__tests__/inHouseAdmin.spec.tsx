import React from 'react';
import { render } from '@testing-library/react';
import { InHouseAdmin } from '../cards/inHouseAdmin/inHouseAdmin';
import { axe } from 'jest-axe';

const noop = () => Promise.resolve();

const inHouseAdmin = {
	schemeRoleId: '123',
	title: 'Mr',
	firstname: 'John',
	lastname: 'Smoth',
	effectiveDate: '1997-04-01T00:00:00',
	addressLine1: 'Napier House',
	addressLine2: 'Trafalgar Pl',
	addressLine3: '',
	postTown: 'Brighton',
	postCode: 'BN1 4DW',
	county: 'West Sussex',
	countryId: '',
	telephoneNumber: '01273 222 111',
	emailAddress: 'john.wick@warnerbros.com',
};

describe('InHouseAdmin Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<InHouseAdmin
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
