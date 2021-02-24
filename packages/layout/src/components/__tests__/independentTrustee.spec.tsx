import React from 'react';
import { render } from '@testing-library/react';
import { IndependentTrusteeCard } from '../cards/independentTrustee/independentTrustee';
import { IndependentTrustee } from '../cards/independentTrustee/context';
import { axe } from 'jest-axe';
import { cleanup } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { assertThatButtonHasAriaExpanded } from '../testHelpers/testHelpers';

const noop = () => Promise.resolve();

const independentTrustee: IndependentTrustee = {
	id: '',
	schemeRoleId: 222,
	effectiveDate: '',
	organisationName: 'Pensions Are Us Limited',
	appointedByRegulator: true,
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

describe('Professional / Independent Trustee Card', () => {
	describe('Preview', () => {
		let component, findByText, findAllByText, findByTitle;
		beforeEach(() => {
			const { container, getByText, getAllByText, queryByTitle } = render(
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
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
			expect(findByText('Appointed by the regulator')).toBeDefined();
			assertThatButtonHasAriaExpanded(
				findByText,
				'Appointed by the regulator',
				false,
			);
		});

		test('initial status is correct', () => {
			expect(findAllByText('Confirmed').length).toEqual(2);
			expect(findByTitle('Confirmed')).toBeDefined();
			expect(findByText('Confirm details are correct.')).toBeDefined();
		});

		test('Organisation block displays values correctly', () => {
			expect(findByText('Pensions Are Us Limited')).toBeDefined();
			expect(findByText('Professional / Independent Trustee')).toBeDefined();
		});

		test('Address block displays values correctly', () => {
			expect(findByText('The Pensions Regulator')).toBeDefined();
			expect(findByText('Napier House')).toBeDefined();
			expect(findByText('Trafalgar Pl')).toBeDefined();
			expect(findByText('Brighton')).toBeDefined();
			expect(findByText('BN1 4DW')).toBeDefined();
			expect(findByText('West Sussex')).toBeDefined();
		});

		test('Appointed by the regulator block displays value correctly', () => {
			expect(findByText('Yes')).toBeDefined();
		});
	});

	describe('editing Appointed by the regulator', () => {
		let component, findByText, findByTestId;
		beforeEach(async () => {
			const { container, getByText, getByTestId } = render(
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
				/>,
			);

			component = container;
			findByText = getByText;
			findByTestId = getByTestId;

			findByText('Appointed by the regulator').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('indicating if trustee was appointed by the regulator', () => {
			expect(findByTestId('independent-regulator-form')).not.toBe(null);
			expect(
				findByText(
					'Was this trustee appointed to this scheme by the regulator?',
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
				<IndependentTrusteeCard
					independentTrustee={independentTrustee}
					complete={true}
					onCorrect={() => {}}
					onRemove={noop}
					onSaveAppointed={noop}
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

		test('remove Independent Trustee - reason', () => {
			expect(findByTestId('remove-trustee-form')).not.toBe(null);
			expect(findByText('Remove this trustee')).toBeDefined();
			expect(findByText('Why are you removing this trustee?')).toBeDefined();
			expect(findByText('They have left the scheme')).toBeDefined();
			expect(findByText('They were never part of the scheme.')).toBeDefined();
			expect(findByText('Continue')).toBeDefined();
		});

		test('remove Independent Trustee - confirm', async () => {
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
					findByText('Are you sure you want to remove this trustee?'),
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
					findByText('Professional / Independent Trustee removed successfully'),
				).toBeDefined();
			});
		});
	});
});
