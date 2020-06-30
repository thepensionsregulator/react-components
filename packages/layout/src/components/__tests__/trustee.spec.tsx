import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Trustee } from '../cards/trustee/trustee';

// TODO

// test state transitions
// test each form
// test search functionality
// test checkbox state toggles

const trustee = {
	schemeRoleId: '12345',
	//
	title: 'Mr',
	firstname: 'John',
	lastname: 'Smith',
	trusteeType: 'member-nominated',
	isProfessionalTrustee: false,
	//
	addressLine1: 'The Pensions Regulator',
	addressLine2: 'Napier House',
	addressLine3: 'Trafalgar Pl',
	postTown: 'Brighton',
	postcode: 'BN1 4DW',
	county: 'West Sussex',
	countryId: '',
	//
	telephoneNumber: '01273 000 111',
	emailAddress: 'fred.sandoors@trp.gov.uk',
};

describe('Trustee Preview', () => {
	test('buttons renders correctly', () => {
		const callbackFn = () => Promise.resolve();
		const { getByText } = render(
			<Trustee
				onDetailsSave={callbackFn}
				onContactSave={callbackFn}
				onAddressSave={callbackFn}
				onRemove={callbackFn}
				onCorrect={(_value) => {}}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				complete={true}
				trustee={trustee}
				testId={trustee.schemeRoleId}
			/>,
		);

		// Buttons are visible

		expect(getByText('Trustee')).toBeDefined();
		expect(getByText('Correspondence address')).toBeDefined();
		expect(getByText('Contact details')).toBeDefined();
		expect(getByText('Remove')).toBeDefined();
	});

	test('initial status is correct', () => {
		const callbackFn = () => Promise.resolve();
		const { getByText } = render(
			<Trustee
				onDetailsSave={callbackFn}
				onContactSave={callbackFn}
				onAddressSave={callbackFn}
				onRemove={callbackFn}
				onCorrect={(_value) => {}}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				complete={true}
				trustee={trustee}
				testId={trustee.schemeRoleId}
			/>,
		);

		expect(getByText('No issues')).toBeDefined();
		expect(getByText('All details are correct.')).toBeDefined();
	});

	test('address shows up correctly', () => {
		const callbackFn = () => Promise.resolve();
		const { getByText } = render(
			<Trustee
				onDetailsSave={callbackFn}
				onContactSave={callbackFn}
				onAddressSave={callbackFn}
				onRemove={callbackFn}
				onCorrect={(_value) => {}}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				complete={true}
				trustee={trustee}
				testId={trustee.schemeRoleId}
			/>,
		);

		expect(getByText(trustee.addressLine1)).toBeDefined();
		expect(getByText(trustee.addressLine2)).toBeDefined();
		expect(getByText(trustee.addressLine3)).toBeDefined();
		expect(getByText(trustee.postTown)).toBeDefined();
		expect(getByText(trustee.postcode)).toBeDefined();
	});

	test('contact details shows up correctly', () => {
		const callbackFn = () => Promise.resolve();
		const { getByText } = render(
			<Trustee
				onDetailsSave={callbackFn}
				onContactSave={callbackFn}
				onAddressSave={callbackFn}
				onRemove={callbackFn}
				onCorrect={(_value) => {}}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				complete={true}
				trustee={trustee}
				testId={trustee.schemeRoleId}
			/>,
		);

		expect(getByText('Phone')).toBeDefined();
		expect(getByText(trustee.telephoneNumber)).toBeDefined();
		expect(getByText('Email')).toBeDefined();
		expect(getByText(trustee.emailAddress)).toBeDefined();
	});
});
