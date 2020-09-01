import React from 'react';
import { render } from '@testing-library/react';
import { ActuaryCard } from '../cards/actuary/actuary';
import { Actuary } from '../cards/actuary/context';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react-hooks';

const noop = () => Promise.resolve();

const actuary: Actuary = {
	id: '',
	schemeRoleId: '123',
	title: 'Mr',
	firstname: 'John',
	lastname: 'Johnson',
	effectiveDate: '2010-01-01T00:00:00',
	telephoneNumber: '01273 000 111',
	emailAddress: 'john@actuary.com',
	organisationName: 'Actuaries Group Ltd',
	address: {
		addressLine1: 'The Pensions Regulator',
		addressLine2: 'Napier House',
		addressLine3: 'Trafalgar Pl',
		postTown: 'Brighton',
		postCode: 'BN1 4DW',
		county: 'West Sussex',
		country: '',
		countryId: '',
	},
};

describe('Actuary Card', () => {
	describe('Preview', () => {
		let component, findByText;
		beforeEach(() => {
			const { container, getByText } = render(
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
		});

		test('no Violations', async () => {
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		test('it renders buttons correctly', () => {
			expect(component.querySelector('button')).not.toBe(null);
			expect(findByText('Actuary')).toBeDefined();
			expect(findByText('Remove')).toBeDefined();
			expect(findByText('Contact details')).toBeDefined();
		});

		test('initial status is correct', () => {
			expect(findByText('No issues')).toBeDefined();
			expect(findByText('All details are correct.')).toBeDefined();
		});

		test('displays Name Correctly', () => {
			expect(findByText('Mr John Johnson')).toBeDefined();
		});

		test('displays Organisation Name Correctly', () => {
			expect(findByText('Actuaries Group Ltd')).toBeDefined();
		});

		test('displays Address correctly', () => {
			expect(findByText('Napier House')).toBeDefined();
		});

		test('displays telephone number correctly', () => {
			expect(findByText('01273 000 111')).toBeDefined();
		});

		test('displays email correctly', () => {
			expect(findByText('john@actuary.com')).toBeDefined();
		});
	});

	describe('updating Actuary Name', () => {
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

			findByText('Actuary').click();
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			cleanup();
		});

		test('editing actuary Name', () => {
			expect(findByTestId('actuary-name-form')).not.toBe(null);
			expect(findByText('Title (optional)')).toBeDefined();
			expect(findByText('First name')).toBeDefined();
			expect(findByText('Last name')).toBeDefined();
			expect(findByText('Save and Close')).toBeDefined();
		});

		test('save and close', async () => {
			await act(async () => {
				findByText('Save and Close').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				// After clicking the "Save and Close" button, it goes back to the Preview
				expect(findByText('Address')).toBeDefined();
			});
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
			const results = await axe(component);
			expect(results).toHaveNoViolations();
		});

		afterEach(() => {
			cleanup();
		});

		test('editing contact details', () => {
			expect(findByTestId('actuary-contact-form')).not.toBe(null);
			expect(findByText('Telephone number')).toBeDefined();
			expect(findByText('Email address')).toBeDefined();
			expect(findByText('Save and close')).toBeDefined();
		});

		test('save and close', async () => {
			await act(async () => {
				findByText('Save and close').click();
				const results = await axe(component);
				expect(results).toHaveNoViolations();
				// After clicking the "Save and Close" button, it goes back to the Preview
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
