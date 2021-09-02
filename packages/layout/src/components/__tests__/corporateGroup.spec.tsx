import React from 'react';
import { render } from '@testing-library/react';
import { CorporateGroupCard } from '../cards/corporateGroup/corporateGroup';
import { CorporateGroup } from '../cards/corporateGroup/context';
import { axe } from 'jest-axe';
import { cleanup } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingButtonsExist,
	assertHeadingsExist,
} from '../testHelpers/testHelpers';
import {
	sampleAddress,
	disableHeadingOrder,
} from '../testHelpers/commonData/cards';

const noop = () => Promise.resolve();

const corporateGroup: CorporateGroup = {
	id: '',
	schemeRoleId: 11,
	effectiveDate: '',
	organisationName: 'Acme Factory Pension Trustees Limited',
	title: 'Miss',
	firstName: 'Susan',
	lastName: 'Smith',
	directorIsProfessional: true,
	telephoneNumber: '01273 000 111',
	emailAddress: 'susan@corporate-group.com',
	address: sampleAddress,
};

describe('Corporate Group Trustee Card', () => {
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
				<CorporateGroupCard
					corporateGroup={corporateGroup}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					onSaveDirector={noop}
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

		test('it renders sections correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);

			assertMainHeadingExists(
				findByText,
				findByTestId,
				'Corporate Trustee',
				false,
			);

			assertRemoveButtonExists(findByText, findByTestId);

			const h4Buttons: string[] = [
				'Director(s) are Professional Trustees',
				'Chair of board',
			];
			assertHeadingButtonsExist(findAllByTestId, findByText, h4Buttons);

			const h4Headings: string[] = ['Address'];
			assertHeadingsExist(findAllByTestId, h4Headings);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(1);
			expect(findByTitle('Confirmed')).toBeDefined();
		});

		test('Organisation block displays values correctly', () => {
			expect(findByText('Acme Factory Pension Trustees Limited')).toBeDefined();
			expect(findByText('Corporate Group trustee')).toBeDefined();
		});

		test('Address block displays values correctly', () => {
			const addressPreview = findByTestId('address-preview');
			const addressExpected = `${corporateGroup.address.addressLine1}<br>${corporateGroup.address.addressLine2}<br>${corporateGroup.address.addressLine3}<br>${corporateGroup.address.postTown}<br>${corporateGroup.address.county}<br>${corporateGroup.address.postcode}<br>${corporateGroup.address.country}`;
			expect(addressPreview).toBeDefined();
			expect(addressPreview.innerHTML).toEqual(addressExpected);
		});

		test('Chair-of-board block displays values correctly', () => {
			expect(findByText('Miss Susan Smith')).toBeDefined();
			expect(findByText('01273 000 111')).toBeDefined();
			expect(findByText('susan@corporate-group.com')).toBeDefined();
		});

		test('Director(s) block displays values correctly', () => {
			expect(findByText('Yes')).toBeDefined();
		});

		test('renders with a section containing an aria label', () => {
			assertThatASectionExistsWithAnAriaLabel(
				findByRole,
				`${corporateGroup.organisationName} Corporate Group trustee`,
			);
		});

		test('replaces __NAME__ in the checkbox label', () => {
			expect(
				findByText(`Confirm '${corporateGroup.organisationName}' is correct.`),
			).toBeDefined();
		});
	});

	describe('editing Chair-of-board', () => {
		let component, findByText, findByTestId;
		beforeEach(() => {
			const { container, getByText, getByTestId } = render(
				<CorporateGroupCard
					corporateGroup={corporateGroup}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					onSaveDirector={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Chair of board').click();
		});

		afterEach(() => {
			cleanup();
		});

		test('editing Name of the chair of the board passes AXE accessibility testing', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('editing Name of the chair of the board', () => {
			expect(findByTestId('corporateGroup-name-form')).not.toBe(null);
			const titleHtmlElement = findByTestId('title') as HTMLElement;
			const firstNameHtmlElement = findByTestId('first-name') as HTMLElement;
			const lastNameHtmlElement = findByTestId('last-name') as HTMLElement;

			expect(titleHtmlElement).toBeDefined();
			expect(titleHtmlElement).toHaveAttribute('maxlength', '35');
			expect(titleHtmlElement).toHaveAttribute(
				'autocomplete',
				'honorific-prefix',
			);
			expect(titleHtmlElement).toHaveAttribute('value', corporateGroup.title);
			expect(firstNameHtmlElement).toBeDefined();
			expect(firstNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(firstNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'given-name',
			);
			expect(firstNameHtmlElement).toHaveAttribute(
				'value',
				corporateGroup.firstName,
			);
			expect(firstNameHtmlElement).toHaveAttribute('required');
			expect(lastNameHtmlElement).toBeDefined();
			expect(lastNameHtmlElement).toHaveAttribute('maxlength', '70');
			expect(lastNameHtmlElement).toHaveAttribute(
				'autocomplete',
				'family-name',
			);
			expect(lastNameHtmlElement).toHaveAttribute(
				'value',
				corporateGroup.lastName,
			);
			expect(lastNameHtmlElement).toHaveAttribute('required');
			expect(findByText('Continue')).toBeDefined();
		});

		test('editing contact details for chair of the board', async () => {
			await act(async () => {
				findByText('Continue').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				const telHtmlElement = findByText('Telephone number');
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
					corporateGroup.telephoneNumber,
				);
				const emailHtmlElement = findByText('Email address');
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
					corporateGroup.emailAddress,
				);
				expect(findByText('Save and close')).toBeDefined();
			});

			await act(async () => {
				findByText('Save and close').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				// After clicking the "Save and close" button, it goes back to the Preview
				expect(findByText('Address')).toBeDefined();
			});
		});
	});

	describe('editing Director(s) are Professional Trustees', () => {
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<CorporateGroupCard
					corporateGroup={corporateGroup}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					onSaveDirector={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Director(s) are Professional Trustees').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('editing Director(s) type', () => {
			expect(findByTestId('corporateGroup-directors-form')).not.toBe(null);
			expect(
				findByText(
					'Are any of the directors of this corporate trustee a professional trustee?',
				),
			).toBeDefined();
			expect(findByText('Yes')).toBeDefined();
			expect(findByText('No')).toBeDefined();
			expect(findByText('Save and close')).toBeDefined();
		});
	});

	describe('Remove Corporate Group Trustee', () => {
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<CorporateGroupCard
					corporateGroup={corporateGroup}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveContacts={noop}
					onSaveName={noop}
					onSaveDirector={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Remove').click();
			const results = await axe(component, { rules: disableHeadingOrder });
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			cleanup();
		});

		test('remove Corporate Group - reason', () => {
			expect(findByTestId('remove-trustee-form')).not.toBe(null);
			expect(findByText('Remove this trustee')).toBeDefined();
			expect(findByText('Why are you removing this trustee?')).toBeDefined();
			expect(findByText('They have left the scheme')).toBeDefined();
			expect(findByText('They were never part of the scheme.')).toBeDefined();
			expect(findByText('Continue')).toBeDefined();
		});

		test('remove Corporate Group - confirm', async () => {
			await act(async () => {
				findByText('They were never part of the scheme.').click();
				const results = await axe(component, { rules: disableHeadingOrder });
				expect(results).toHaveNoViolations();
			});

			await act(async () => {
				findByText('Continue').click();
				const results = await axe(component, { rules: disableHeadingOrder });
				expect(results).toHaveNoViolations();
				expect(
					findByText('Are you sure you want to remove this corporate trustee?'),
				).toBeDefined();
				expect(findByText("This can't be undone.")).toBeDefined();
				expect(findByText('Remove Trustee')).toBeDefined();
				expect(findByText('Cancel')).toBeDefined();
			});

			// Removed => confirmation banner
			await act(async () => {
				findByText('Remove Trustee').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				expect(
					findByText('Corporate Group Trustee removed successfully'),
				).toBeDefined();
			});
		});
	});
});
