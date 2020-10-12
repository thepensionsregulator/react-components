import React from 'react';
import {
	getAllByLabelText,
	getAllByText,
	getByDisplayValue,
	getByLabelText,
	render,
	waitFor,
} from '@testing-library/react';
import { TrusteeCard } from '../cards/trustee/trustee';
import { axe } from 'jest-axe';
import { Trustee } from '../cards/trustee/context';
import userEvent from '@testing-library/user-event';

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

		expect(getByText('No issues')).toBeDefined();
		expect(getByText('All details are correct.')).toBeDefined();
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

		getByText('Trustee').click();
		const results = await axe(container);
		expect(results).toHaveNoViolations();
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

describe('Trustee Auto Address', () => {
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

		getByText('Correspondence address').click();

		// wait for initial postcode to be loaded
		await waitFor(() => {});

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('invalid postcodes disable the find address function', async () => {
		trustee.postcode = 'INVALID POSTCODE';

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
		await waitFor(() => {});

		getByText('Change').click();
		await waitFor(() => {});

		expect(getByDisplayValue(container, trustee.postcode)).toBeDefined;
		expect(getByText('Find Address')).toBeDisabled();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee Manual Address', () => {
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

		getByText('Correspondence address').click();

		// wait for initial postcode to be loaded
		await waitFor(() => {});

		getByText(`I can't find my address in the list`).click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('address line 1 is required', async () => {
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

		await navigateToManuallyEnteredAddress(getByText);

		expect(getByText(`Address line 1`).nextSibling.textContent).toEqual(
			'This is a required field',
		);

		userEvent.type(getByLabelText(container, `Address line 1`), 'a');

		expect(getByText(`Address line 1`).nextSibling.textContent).toEqual(
			'Must be at least 2 chars',
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('city is required', async () => {
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

		await navigateToManuallyEnteredAddress(getByText);
		await fillInAddressLine1(container);

		expect(getByText(`City`).nextSibling.textContent).toEqual(
			'This is a required field',
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('valid postcode is required', async () => {
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

		await navigateToManuallyEnteredAddress(getByText);
		await fillInAddressLine1(container);
		await fillInCity(container);

		let addressElement = getByText(`Address`).parentElement;

		userEvent.clear(getAllByLabelText(addressElement, 'Postcode')[0]);
		expect(getAllByLabelText(addressElement, 'Postcode')[0]).toBeDefined();

		expect(
			getAllByText(addressElement, 'Postcode')[0].nextSibling.textContent,
		).toEqual('This is a required field');

		userEvent.type(
			getAllByLabelText(addressElement, 'Postcode')[0],
			'INVALID POSTCODE',
		);

		expect(
			getAllByText(addressElement, 'Postcode')[0].nextSibling.textContent,
		).toEqual('Incorrect postcode format');

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('county is required', async () => {
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

		await navigateToManuallyEnteredAddress(getByText);
		await fillInAddressLine1(container);
		await fillInCity(container);
		await fillInPostcode(container);

		expect(getByText(`County`).nextSibling.textContent).toEqual(
			'This is a required field',
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	const navigateToManuallyEnteredAddress = async (getByText) => {
		getByText('Correspondence address').click();
		await waitFor(() => {});

		getByText(`I can't find my address in the list`).click();
		await waitFor(() => {});

		getByText('Save and close').click();
		await waitFor(() => {});
	};

	const fillInAddressLine1 = async (container) => {
		userEvent.type(
			getByLabelText(container, 'Address line 1'),
			'Valid address line 1',
		);
	};

	const fillInCity = async (container) => {
		userEvent.type(getByLabelText(container, 'City'), 'Valid city');
	};

	const fillInPostcode = async (container) => {
		userEvent.clear(getAllByLabelText(container, 'Postcode')[0]);
		userEvent.type(getByLabelText(container, 'Postcode'), 'BN11AA');
	};
});
