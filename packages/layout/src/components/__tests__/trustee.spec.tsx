import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { TrusteeCard } from '../cards/trustee/trustee';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { Trustee } from '../cards/trustee/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged,
	clearTitleField,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingButtonsExist,
} from '../testHelpers/testHelpers';
import { sampleAddress } from '../testHelpers/commonData/cards';

const noop = () => Promise.resolve();

const trustee: Trustee = {
	...sampleAddress,
	//
	id: '',
	schemeRoleId: 12345,
	//
	title: 'Mr',
	firstName: 'John',
	lastName: 'Smith',
	trusteeType: 'member-nominated',
	isProfessionalTrustee: false,
	//
	telephoneNumber: '01273 000 111',
	emailAddress: 'fred.sandoors@trp.gov.uk',
	effectiveDate: '1997-04-01T00:00:00',
};
let component,
	findByText,
	findAllByText,
	findByTitle,
	findByTestId,
	findByRole,
	findByTextQuery,
	findAllByTestId;
let updatedTrustee = null;

const getCard = (enableContactDetails: boolean) => {
	return (
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
			enableContactDetails={enableContactDetails}
		/>
	);
};

const setupComponent = (enableContactDetails: boolean) => {
	const {
		container,
		getByText,
		getAllByText,
		queryByTitle,
		getByTestId,
		getByRole,
		queryByText,
		getAllByTestId,
	} = render(getCard(enableContactDetails));

	component = container;
	findByText = getByText;
	findByTestId = getByTestId;
	findAllByText = getAllByText;
	findByTitle = queryByTitle;
	findByRole = getByRole;
	findByTextQuery = queryByText;
	findAllByTestId = getAllByTestId;
};

const trusteeName: string = `${trustee.title} ${trustee.firstName} ${trustee.lastName}`;

describe('TrusteeCard enableContactDetails == true', () => {
	beforeEach(async () => {
		setupComponent(true);
	});

	describe('Trustee Preview', () => {
		test('is accessible', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('buttons render correctly', () => {
			assertMainHeadingExists(findByText, findByTestId, trusteeName, true);

			assertRemoveButtonExists(findByText, findByTestId);

			const h4Buttons = ['Correspondence address', 'Contact details'];
			assertHeadingButtonsExist(findAllByTestId, findByText, h4Buttons);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(1);
			expect(findByTitle('Confirmed')).toBeDefined();
		});

		test('address shows up correctly', () => {
			const organisationName = findByText(trustee.addressLine1);
			const addressPreview = findByTestId('address-preview');
			const addressExpected = `${trustee.addressLine2}<br>${trustee.addressLine3}<br>${trustee.postTown}<br>${trustee.county}<br>${trustee.postcode}<br>${trustee.country}`;
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
				`${trusteeName} ${trustee.trusteeType} Trustee`,
			);
		});

		test('replaces __NAME__ in the checkbox label', () => {
			expect(findByText(`Confirm 'Mr John Smith' is correct.`)).toBeDefined();
		});
	});

	describe('Trustee Name', () => {
		afterEach(() => {
			cleanup();
		});

		test('is accessible', async () => {
			findByText(trusteeName).click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('renders name fields', () => {
			findByText(trusteeName).click();

			expect(findByTestId('trustee-name-form')).not.toBe(null);

			const titleHtmlElement = findByTestId('title') as HTMLElement;
			const firstNameHtmlElement = findByTestId('first-name') as HTMLElement;
			const lastNameHtmlElement = findByTestId('last-name') as HTMLElement;

			expect(titleHtmlElement).toBeDefined();
			expect(titleHtmlElement).toHaveAttribute('maxlength', '35');
			expect(titleHtmlElement).toHaveAttribute(
				'autocomplete',
				'honorific-prefix',
			);
			expect(titleHtmlElement).toHaveAttribute('value', trustee.title);
			expect(firstNameHtmlElement).toBeDefined();
			expect(firstNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(firstNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'given-name',
			);
			expect(firstNameHtmlElement).toHaveAttribute('value', trustee.firstName);
			expect(firstNameHtmlElement).toHaveAttribute('required');
			expect(lastNameHtmlElement).toBeDefined();
			expect(lastNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(lastNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'family-name',
			);
			expect(lastNameHtmlElement).toHaveAttribute('value', trustee.lastName);
			expect(lastNameHtmlElement).toHaveAttribute('required');
			expect(findByText('Continue')).toBeDefined();

			assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
		});

		test('trustee title can be left empty when name is updated', async () => {
			await act(async () => {
				findByText(trusteeName).click();
			});
			await axe(component);
			clearTitleField(findByText);
			await act(async () => {
				findByText(/Continue/).click();
			});
			await act(async () => {
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
		afterEach(() => {
			cleanup();
		});

		test('is accessible', async () => {
			findByText(trusteeName).click();
			findByText(/Continue/).click();

			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});
	});

	describe('Trustee Contact Details', () => {
		afterEach(() => {
			cleanup();
		});

		test('is accessible', async () => {
			findByText('Contact details').click();

			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('renders contact fields', () => {
			findByText('Contact details').click();

			const telHtmlElement = findByText('Telephone number');
			expect(telHtmlElement).toBeDefined();
			expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'type',
				'tel',
			);
			expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'autocomplete',
				'tel',
			);
			expect(telHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'value',
				trustee.telephoneNumber,
			);
			const emailHtmlElement = findByText('Email address');
			expect(emailHtmlElement).toBeDefined();
			expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'type',
				'email',
			);
			expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'autocomplete',
				'email',
			);
			expect(emailHtmlElement.nextSibling.firstChild).toHaveAttribute(
				'value',
				trustee.emailAddress,
			);
			expect(findByText('Save and close')).toBeDefined();
		});
	});

	describe('Trustee Remove', () => {
		afterEach(() => {
			cleanup();
		});

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
		afterEach(() => {
			cleanup();
		});

		test('Change address is accessible', async () => {
			findByText('Correspondence address').click();
			findByText(/I need to change the address/).click();

			const results = await axe(component);
			expect(results).toHaveNoViolations();
			expect(findByText('Find address')).toBeInTheDocument();
			const cancelButtons = findAllByText(/Cancel/);

			expect(cancelButtons[0]).toBeInTheDocument();
			expect(cancelButtons[1]).toBeInTheDocument();
		});

		test('Cancel change address returns to preview', async () => {
			findByText('Correspondence address').click();
			findByText(/I need to change the address/).click();
			const cancelButtons = findAllByText(/Cancel/);
			cancelButtons[0].click();
			cancelButtons[1].click();

			const results = await axe(component);

			expect(results).toHaveNoViolations();
			expect(findByText('Correspondence address')).toBeInTheDocument();
		});
	});
});

describe('TrusteeCard when enableContactDetails == false', () => {
	beforeEach(async () => {
		setupComponent(false);
	});

	afterEach(() => {
		cleanup();
	});

	describe('Trustee Preview', () => {
		test('contact details does not show when enableContactDetails property is false', () => {
			expect(findByTextQuery('Phone')).toBeNull();
			expect(findByTextQuery(trustee.telephoneNumber)).toBeNull();
			expect(findByTextQuery('Email')).toBeNull();
			expect(findByTextQuery(trustee.emailAddress)).toBeNull();
		});
	});
});
