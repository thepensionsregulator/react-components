import React from 'react';
import { render } from '@testing-library/react';
import { Insurer } from '../cards/insurer/insurer';
import { axe } from 'jest-axe';

const noop = () => Promise.resolve();

const insurer = {
	id: '',
	schemeRoleId: 123,
	effectiveDate: '1997-04-01T00:00:00',
	organisationReference: 123,
	organisationName: 'Some Organisation Name',
	insurerCompanyReference: '12345678',
	addressLine1: 'Napier House',
	addressLine2: 'Trafalgar Pl',
	addressLine3: '',
	postTown: 'Brighton',
	postCode: 'BN1 4DW',
	county: 'West Sussex',
	postcode: '',
	countryId: '',
	telephoneNumber: '01273 222 111',
	emailAddress: 'john.wick@warnerbros.com',
};

describe('Insurer Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Insurer
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
