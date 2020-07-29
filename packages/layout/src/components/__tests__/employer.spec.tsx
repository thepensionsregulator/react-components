import React from 'react';
import { render } from '@testing-library/react';
import { Employer } from '../cards/employer/employer';
import { axe } from 'jest-axe';

const noop = () => Promise.resolve();

const employer = {
	schemeRoleId: 123,
	employerType: 'principal-and-participating' as 'principal-and-participating',
	organisationReference: 0,
	companiesHouseNumber: 'AB123456',
	registeredCharityNumber: '123',
	organisationName: 'The Pensions Regulator',
	addressLine1: 'Napier House',
	addressLine2: 'Trafalgar Pl',
	postTown: 'Brighton',
	postCode: 'BN1 4DW',
	county: 'West Sussex',
	countryId: '',
	effectiveDate: '1997-04-01T00:00:00',
};

describe('Employer Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<Employer
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});
