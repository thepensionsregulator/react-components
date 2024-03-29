import React from 'react';
import { render } from '@testing-library/react';
import { ActuaryCard } from '../cards/actuary/actuary';
import { Actuary } from '../cards/actuary/context';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react-hooks';
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
import { concatenateStrings } from '../../utils';

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
	address: sampleAddress,
	companiesHouseNumber: '123123',
};

const addressExpectedHTML = `${sampleAddress.addressLine1}<br>${sampleAddress.addressLine2}<br>${sampleAddress.addressLine3}<br>${sampleAddress.postTown}<br>${sampleAddress.county}<br>${sampleAddress.postcode}<br>${sampleAddress.country}`;

describe('Actuary Card', () => {
	describe('Preview', () => {
		let component,
			findByText,
			findAllByText,
			findByTitle,
			findByRole,
			findByTestId,
			findAllByTestId;

		beforeEach(() => {
			const {
				container,
				getByText,
				getAllByText,
				queryByTitle,
				getByRole,
				getByTestId,
				getAllByTestId,
			} = render(
				<ActuaryCard
					actuary={actuary}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					testId={actuary.schemeRoleId.toString()}
				/>,
			);

			component = container;
			findByText = getByText;
			findAllByText = getAllByText;
			findByTitle = queryByTitle;
			findByRole = getByRole;
			findByTestId = getByTestId;
			findAllByTestId = getAllByTestId;
		});

		test('no Violations', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('it renders buttons correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);

			assertMainHeadingExists(
				findByText,
				findByTestId,
				concatenateStrings([
					actuary.title,
					actuary.firstName,
					actuary.lastName,
				]),
				true,
			);

			assertRemoveButtonExists(findByText, findByTestId);

			const h4Buttons = ['Contact details'];
			assertHeadingButtonsExist(findAllByTestId, findByText, h4Buttons);
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
			expect(addressPreview).toBeDefined();
			expect(addressPreview.innerHTML).toEqual(addressExpectedHTML);
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
				`${actuary.title} ${actuary.firstName} ${actuary.lastName} Scheme Actuary`,
			);
		});

		test('replaces __NAME__ in the checkbox label', () => {
			expect(findByText("Confirm 'Mr John Johnson' is correct.")).toBeDefined();
		});
	});

	describe('update Actuary Name', () => {
		let component, findByText, findByTestId;
		let updatedActuary = null;

		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
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
			findByTestId = getByTestId;

			const buttonLabel = concatenateStrings([
				actuary.title,
				actuary.firstName,
				actuary.lastName,
			]);

			findByText(buttonLabel).click();
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

			const titleHtmlElement = findByTestId('title') as HTMLElement;
			const firstNameHtmlElement = findByTestId('first-name') as HTMLElement;
			const lastNameHtmlElement = findByTestId('last-name') as HTMLElement;

			expect(titleHtmlElement).toBeDefined();
			expect(titleHtmlElement).toHaveAttribute('maxlength', '35');
			expect(titleHtmlElement).toHaveAttribute(
				'autocomplete',
				'honorific-prefix',
			);
			expect(titleHtmlElement).toHaveAttribute('value', actuary.title);
			expect(firstNameHtmlElement).toBeDefined();
			expect(firstNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(firstNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'given-name',
			);
			expect(firstNameHtmlElement).toHaveAttribute('value', actuary.firstName);
			expect(firstNameHtmlElement).toHaveAttribute('required');
			expect(lastNameHtmlElement).toBeDefined();
			expect(lastNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(lastNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'family-name',
			);
			expect(lastNameHtmlElement).toHaveAttribute('value', actuary.lastName);
			expect(lastNameHtmlElement).toHaveAttribute('required');
			expect(findByText('Save and close')).toBeDefined();
			assertThatButtonHasBeenRemovedFromTheTabFlow(findByText, 'Remove');
		});

		test('save and close', async () => {
			await act(async () => {
				findByText('Save and close').click();
			});
			const results = await axe(component);
			expect(results).toHaveNoViolations();
			// After clicking the "Save and close" button, it goes back to the Preview
			expect(findByText('Address')).toBeDefined();
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
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<ActuaryCard
					actuary={actuary}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					testId={actuary.schemeRoleId.toString()}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

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
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<ActuaryCard
					actuary={actuary}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					testId={actuary.schemeRoleId.toString()}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

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
