import React from 'react';
import { render } from '@testing-library/react';
import { TrusteeCard } from '../cards/trustee/trustee';
import { axe } from 'jest-axe';
import { Trustee } from '../cards/trustee/context';

// TODO: write more tests

const noop = () => Promise.resolve();

const trustee: Trustee = {
	id: '',
	schemeRoleId: 12345,
	//
	title: 'Mr',
	firstName: 'John',
	lastName: 'Smith',
	trusteeType: 'member-nominated',
	isProfessionalTrustee: false,
	//
	addressLine1: 'The Pensions Regulator',
	addressLine2: 'Napier House',
	addressLine3: 'Trafalgar Pl',
	postTown: 'Brighton',
	postcode: 'BN1 4DW',
	county: 'West Sussex',
	country: '',
	countryId: 2,
	//
	telephoneNumber: '01273 000 111',
	emailAddress: 'fred.sandoors@trp.gov.uk',
	effectiveDate: '1997-04-01T00:00:00',
};

describe('Trustee Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('buttons renders correctly', () => {
		const { getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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
		const { getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		expect(getByText('Confirmed')).toBeDefined();
		expect(getByText('Confirm details are correct.')).toBeDefined();
	});

	test('address shows up correctly', () => {
		const { getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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
		const { getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

describe('Trustee Name', () => {
	test('is accessible', async () => {
		const { container, getByText, getByTestId } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText('Trustee').click();
		const results = await axe(container);
		expect(results).toHaveNoViolations();

		expect(getByTestId('trustee-name-form')).not.toBe(null);

		var titleHtmlElement = getByText('Title (optional)') as HTMLElement;
		var firstNameHtmlElement = getByText('First name') as HTMLElement;
		var lastNameHtmlElement = getByText('Last name') as HTMLElement;

		expect(titleHtmlElement).toBeDefined();
		expect(titleHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'35',
		);
		expect(firstNameHtmlElement).toBeDefined();
		expect(firstNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'70',
		);
		expect(lastNameHtmlElement).toBeDefined();
		expect(lastNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
			'maxlength',
			'70',
		);
		expect(getByText('Continue')).toBeDefined();
	});
});

describe('Trustee Type', () => {
	test('is accessible', async () => {
		const { container, getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText(/Trustee/).click();
		getByText(/Continue/).click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee Contact Details', () => {
	test('is accessible', async () => {
		const { container, getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText('Contact details').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee Remove', () => {
	test('is accessible', async () => {
		const { container, getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee correspondence address', () => {
	test('Change address is accessible', async () => {
		const { container, getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText('Correspondence address').click();
		getByText(/I need to change the address/).click();

		const results = await axe(container);

		expect(results).toHaveNoViolations();
		expect(getByText('Find address')).toBeInTheDocument();
		expect(getByText('Cancel')).toBeInTheDocument();
	});

	test('Cancel change address returns to preview', async () => {
		const { container, getByText } = render(
			<TrusteeCard
				onDetailsSave={noop}
				onContactSave={noop}
				onAddressSave={noop}
				onRemove={noop}
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

		getByText('Correspondence address').click();
		getByText(/I need to change the address/).click();
		getByText(/Cancel/).click();

		const results = await axe(container);

		expect(results).toHaveNoViolations();
		expect(getByText('Correspondence address')).toBeInTheDocument();
	});
});
