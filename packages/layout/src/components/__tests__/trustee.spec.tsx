import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { TrusteeCard } from '../cards/trustee/trustee';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { Trustee } from '../cards/trustee/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasAriaExpanded,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged,
	clearTitleField,
} from '../testHelpers/testHelpers';

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
let component, findByText, findAllByText, findByTitle, findByTestId, findByRole;
let updatedTrustee = null;

beforeEach(async () => {
	const {
		container,
		getByText,
		getAllByText,
		queryByTitle,
		getByTestId,
		getByRole,
	} = render(
		<TrusteeCard
			onDetailsSave={(values) => {
				updatedTrustee = values;
				return noop();
			}}
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

	component = container;
	findByText = getByText;
	findByTestId = getByTestId;
	findAllByText = getAllByText;
	findByTitle = queryByTitle;
	findByRole = getByRole;
});

afterEach(() => {
	cleanup();
});

describe('Trustee Preview', () => {
	test('is accessible', async () => {
		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('buttons renders correctly', () => {
		// Buttons are visible
		expect(findByText('Trustee')).toBeDefined();
		expect(findByText('Correspondence address')).toBeDefined();
		assertThatButtonHasAriaExpanded(
			findByText,
			'Correspondence address',
			false,
		);
		expect(findByText('Contact details')).toBeDefined();
		assertThatButtonHasAriaExpanded(findByText, 'Contact details', false);
		expect(findByText('Remove')).toBeDefined();
	});

	test('initial status is correct', () => {
		expect(findAllByText('Confirmed').length).toEqual(2);
		expect(findByTitle('Confirmed')).toBeDefined();
		expect(findByText('Confirm details are correct.')).toBeDefined();
	});

	test('address shows up correctly', () => {
		const organisationName = findByText(trustee.addressLine1);
		const addressPreview = findByTestId('address-preview');
		const addressExpected = `${trustee.addressLine2}<br>${trustee.addressLine3}<br>${trustee.postTown}<br>${trustee.county}<br>${trustee.postcode}<br>`;
		expect(organisationName).toBeDefined();
		expect(addressPreview).toBeDefined();
		expect(addressPreview.innerHTML).toEqual(addressExpected);
	});

	test('contact details shows up correctly', () => {
		expect(findByText('Phone')).toBeDefined();
		expect(findByText(trustee.telephoneNumber)).toBeDefined();
		expect(findByText('Email')).toBeDefined();
		expect(findByText(trustee.emailAddress)).toBeDefined();
	});

	test('renders with a section containing an aria label', () => {
		assertThatASectionExistsWithAnAriaLabel(
			findByRole,
			`${trustee.title} ${trustee.firstName} ${trustee.lastName} ${trustee.trusteeType} Trustee`,
		);
	});
});

describe('Trustee Name', () => {
	test('is accessible', async () => {
		findByText('Trustee').click();
		const results = await axe(component);
		expect(results).toHaveNoViolations();

		expect(findByTestId('trustee-name-form')).not.toBe(null);

		var titleHtmlElement = findByText('Title (optional)') as HTMLElement;
		var firstNameHtmlElement = findByText('First name') as HTMLElement;
		var lastNameHtmlElement = findByText('Last name') as HTMLElement;

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
		expect(findByText('Continue')).toBeDefined();

		assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
	});

	test('trustee title can be left empty when name is updated', async () => {
		await act(async () => {
			findByText(/Trustee/).click();
			await axe(component);
			clearTitleField(findByText);
			findByText(/Continue/).click();
			findByText(/Save and close/).click();
		});

		await assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged(
			component,
			trustee,
			updatedTrustee,
		);
	});
});

describe('Trustee Type', () => {
	test('is accessible', async () => {
		findByText(/Trustee/).click();
		findByText(/Continue/).click();

		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee Contact Details', () => {
	test('is accessible', async () => {
		findByText('Contact details').click();

		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee Remove', () => {
	test('is accessible', async () => {
		findByText('Remove').click();

		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});

	test('displays correct validation messages', async () => {
		findByText('Remove').click();
		findByText('Continue').click();
		const msg1 = findByText('Select a reason for removing the trustee.');
		expect(msg1).toBeDefined();
		expect(msg1.className.includes('errorMessage')).toBeTruthy();

		findByTestId('leftTheScheme').click();
		findByText('Continue').click();
		const msg2 = findByText('Enter the date the trustee left the scheme.');
		expect(msg2).toBeDefined();
		expect(msg2.className.includes('errorMessage')).toBeTruthy();

		const results = await axe(component);
		expect(results).toHaveNoViolations();
	});
});

describe('Trustee correspondence address', () => {
	test('Change address is accessible', async () => {
		findByText('Correspondence address').click();
		findByText(/I need to change the address/).click();

		const results = await axe(component);

		expect(results).toHaveNoViolations();
		expect(findByText('Find address')).toBeInTheDocument();
		expect(findByText('Cancel')).toBeInTheDocument();
	});

	test('Cancel change address returns to preview', async () => {
		findByText('Correspondence address').click();
		findByText(/I need to change the address/).click();
		findByText(/Cancel/).click();

		const results = await axe(component);

		expect(results).toHaveNoViolations();
		expect(findByText('Correspondence address')).toBeInTheDocument();
	});
});
