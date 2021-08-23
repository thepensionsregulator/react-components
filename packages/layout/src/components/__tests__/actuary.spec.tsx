import React from 'react';
import { render } from '@testing-library/react';
import { ActuaryCard } from '../cards/actuary/actuary';
import { Actuary } from '../cards/actuary/context';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react-hooks';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasAriaExpanded,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged,
	clearTitleField,
} from '../testHelpers/testHelpers';

const noop = () => Promise.resolve();

const actuary: Actuary = {
	id: '',
	schemeRoleId: 123,
	title: 'Mr',
	firstName: 'John',
	lastName: 'Johnson',
	effectiveDate: '2010-01-01T00:00:00',
	telephoneNumber: '01273 000 111',
	emailAddress: 'john@actuary.com',
	organisationName: 'Actuaries Group Ltd',
	address: {
		addressLine1: 'The Pensions Regulator',
		addressLine2: 'Napier House',
		addressLine3: 'Trafalgar Pl',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		country: 'UK',
		countryId: 2,
	},
};

describe('Actuary Card', () => {
	let component,
		findByText,
		findAllByText,
		findByTitle,
		findByRole,
		findByTestId;
	let updatedActuary = null;
	beforeEach(async () => {
		const {
			container,
			getByText,
			getAllByText,
			queryByTitle,
			getByRole,
			getByTestId,
		} = render(
			<ActuaryCard
				actuary={actuary}
				complete={true}
				onCorrect={() => {}}
				onRemove={noop}
				onSaveContacts={noop}
				onSaveName={(values) => {
					updatedActuary = values;
					return noop();
				}}
				testId={actuary.schemeRoleId.toString()}
			/>,
		);

		component = container;
		findByText = getByText;
		findAllByText = getAllByText;
		findByTitle = queryByTitle;
		findByRole = getByRole;
		findByTestId = getByTestId;
	});

	describe('Preview', () => {
		test('no Violations', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('it renders buttons correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);
			expect(findByText('Actuary')).toBeDefined();
			assertThatButtonHasAriaExpanded(findByText, 'Actuary', false);
			expect(findByText('Remove')).toBeDefined();
			assertThatButtonHasAriaExpanded(findByText, 'Remove', false);
			expect(findByText('Contact details')).toBeDefined();
			assertThatButtonHasAriaExpanded(findByText, 'Contact details', false);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(1);
			expect(findByTitle('Confirmed')).toBeDefined();
		});

		test('displays Name Correctly', () => {
			expect(findByText('Mr John Johnson')).toBeDefined();
		});

		test('displays Organisation Name Correctly', () => {
			expect(findByText('Actuaries Group Ltd')).toBeDefined();
		});

		test('displays Address correctly', () => {
			const addressPreview = findByTestId('address-preview');
			const addressExpected = `${actuary.address.addressLine1}<br>${actuary.address.addressLine2}<br>${actuary.address.addressLine3}<br>${actuary.address.postTown}<br>${actuary.address.county}<br>${actuary.address.postcode}<br>${actuary.address.country}`;
			expect(addressPreview).toBeDefined();
			expect(addressPreview.innerHTML).toEqual(addressExpected);
		});

		test('displays telephone number correctly', () => {
			expect(findByText('01273 000 111')).toBeDefined();
		});

		test('displays email correctly', () => {
			expect(findByText('john@actuary.com')).toBeDefined();
		});

		test('renders with a section containing an aria label', () => {
			assertThatASectionExistsWithAnAriaLabel(
				findByRole,
				`${actuary.title} ${actuary.firstName} ${actuary.lastName} Actuary`,
			);
		});

		test('replaces __NAME__ in the checkbox label', () => {
			expect(findByText("Confirm 'Mr John Johnson' is correct.")).toBeDefined();
		});
	});

	describe('update Actuary Name', () => {
		beforeEach(async () => {
			act(() => {
				findByText('Actuary').click();
			});
		});

		afterEach(() => {
			cleanup();
		});

		test('passes AXE accessibility testing', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('renders name fields', () => {
			expect(findByTestId('actuary-name-form')).not.toBe(null);

			var titleHtmlElement = findByText('Title (optional)') as HTMLElement;
			var firstNameHtmlElement = findByText('First name') as HTMLElement;
			var lastNameHtmlElement = findByText('Last name') as HTMLElement;

			expect(titleHtmlElement).toBeDefined();
			expect(titleHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'maxlength',
				'35',
			);
			expect(titleHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'autocomplete',
				'honorific-prefix',
			);
			expect(titleHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'value',
				actuary.title,
			);
			expect(firstNameHtmlElement).toBeDefined();
			expect(firstNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'maxlength',
				'70',
			);
			expect(firstNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'autocomplete',
				'given-name',
			);
			expect(firstNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'value',
				actuary.firstName,
			);
			expect(lastNameHtmlElement).toBeDefined();
			expect(lastNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'maxlength',
				'70',
			);
			expect(lastNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'autocomplete',
				'family-name',
			);
			expect(lastNameHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'value',
				actuary.lastName,
			);
			expect(findByText('Save and close')).toBeDefined();
			assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
		});

		test('save and close', async () => {
			await act(async () => {
				findByText('Save and close').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				// After clicking the "Save and close" button, it goes back to the Preview
				expect(findByText('Address')).toBeDefined();
			});
		});

		test('actuary title can be left empty when name is updated', async () => {
			await act(async () => {
				clearTitleField(findByText);
				findByText(/Save and close/).click();
			});

			await assertThatTitleWasSetToNullWhileFirstAndLastNamesWereLeftUnchanged(
				component,
				actuary,
				updatedActuary,
			);
		});
	});

	describe('updating Actuary Contact Details', () => {
		beforeEach(async () => {
			findByText('Contact details').click();
		});

		afterEach(() => {
			cleanup();
		});

		test('passes AXE accessibility testing', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('renders phone and email fields', () => {
			expect(findByTestId('actuary-contact-form')).not.toBe(null);
			const telHtmlElement = findByText('Telephone number');
			const emailHtmlElement = findByText('Email address');
			expect(telHtmlElement).toBeDefined();
			expect(telHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'type',
				'tel',
			);
			expect(telHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'autocomplete',
				'tel',
			);
			expect(telHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'value',
				actuary.telephoneNumber,
			);
			expect(emailHtmlElement).toBeDefined();
			expect(emailHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'type',
				'email',
			);
			expect(emailHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'autocomplete',
				'email',
			);
			expect(emailHtmlElement.nextSibling.childNodes[0]).toHaveAttribute(
				'value',
				actuary.emailAddress,
			);
			expect(findByText('Save and close')).toBeDefined();
		});

		test('save and close', async () => {
			await act(async () => {
				findByText('Save and close').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				// After clicking the "Save and close" button, it goes back to the Preview
				expect(findByText('Address')).toBeDefined();
			});
		});
	});

	describe('Remove Actuary', () => {
		beforeEach(async () => {
			findByText('Remove').click();

			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			cleanup();
		});

		test('remove actuary form', () => {
			expect(findByTestId('remove-actuary-form')).not.toBe(null);
			expect(findByText('Remove this actuary')).toBeDefined();
			expect(findByText('Continue')).toBeDefined();
		});
	});
});
