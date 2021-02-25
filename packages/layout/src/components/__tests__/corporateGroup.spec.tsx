import React from 'react';
import { render } from '@testing-library/react';
import { CorporateGroupCard } from '../cards/corporateGroup/corporateGroup';
import { CorporateGroup } from '../cards/corporateGroup/context';
import { axe } from 'jest-axe';
import { cleanup } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { assertThatButtonHasAriaExpanded } from '../testHelpers/testHelpers';

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
	address: {
		addressLine1: 'The Pensions Regulator',
		addressLine2: 'Napier House',
		addressLine3: 'Trafalgar Pl',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		country: '',
		countryId: 2,
	},
};

describe('Corporate Group Trustee Card', () => {
	describe('Preview', () => {
		let component, findByText, findAllByText, findByTitle;
		beforeEach(() => {
			const { container, getByText, getAllByText, queryByTitle } = render(
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
		});

		test('no Violations', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('it renders sections correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);
			expect(findByText('Corporate Trustee')).toBeDefined();
			expect(findByText('Remove')).toBeDefined();
			expect(findByText('Address')).toBeDefined();
			expect(findByText('Chair of board')).toBeDefined();
			assertThatButtonHasAriaExpanded(findByText, 'Chair of board', false);
			expect(findByText('Director(s) are Professional Trustees')).toBeDefined();
			assertThatButtonHasAriaExpanded(
				findByText,
				'Director(s) are Professional Trustees',
				false,
			);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(2);
			expect(findByTitle('Confirmed')).toBeDefined();
			expect(findByText('Confirm details are correct.')).toBeDefined();
		});

		test('Organisation block displays values correctly', () => {
			expect(findByText('Acme Factory Pension Trustees Limited')).toBeDefined();
			expect(findByText('Corporate Group trustee')).toBeDefined();
		});

		test('Address block displays values correctly', () => {
			expect(findByText('The Pensions Regulator')).toBeDefined();
			expect(findByText('Napier House')).toBeDefined();
			expect(findByText('Trafalgar Pl')).toBeDefined();
			expect(findByText('Brighton')).toBeDefined();
			expect(findByText('BN1 4DW')).toBeDefined();
			expect(findByText('West Sussex')).toBeDefined();
		});

		test('Chair-of-board block displays values correctly', () => {
			expect(findByText('Miss Susan Smith')).toBeDefined();
			expect(findByText('01273 000 111')).toBeDefined();
			expect(findByText('susan@corporate-group.com')).toBeDefined();
		});

		test('Director(s) block displays values correctly', () => {
			expect(findByText('Yes')).toBeDefined();
		});
	});

	describe('editing Chair-of-board', () => {
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

			findByText('Chair of board').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();

			expect(getByTestId('corporateGroup-name-form')).not.toBe(null);

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

		afterEach(() => {
			cleanup();
		});

		test('editing Name of the chair of the board', () => {
			expect(findByTestId('corporateGroup-name-form')).not.toBe(null);
			expect(findByText('Title (optional)')).toBeDefined();
			expect(findByText('First name')).toBeDefined();
			expect(findByText('Last name')).toBeDefined();
			expect(findByText('Continue')).toBeDefined();
		});

		test('editing contact details for chair of the board', async () => {
			await act(async () => {
				findByText('Continue').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				expect(findByText('Telephone number')).toBeDefined();
				expect(findByText('Email address')).toBeDefined();
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
			const results = await axe(component);
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
				const results = await axe(component);
				expect(results).toHaveNoViolations();
			});

			await act(async () => {
				findByText('Continue').click();
				const results = await axe(component);
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
