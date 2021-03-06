import React from 'react';
import { render } from '@testing-library/react';
import { EmployerCard } from '../cards/employer/employer';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Employer } from '../cards/employer/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
} from '../testHelpers/testHelpers';

const noop = () => Promise.resolve();

const employer: Employer = {
	id: '',
	schemeRoleId: 123,
	effectiveDate: '1997-04-01T00:00:00',
	employerType: 'principal-and-participating' as 'principal-and-participating',
	organisationReference: 0,
	companiesHouseNumber: 'AB123456',
	registeredCharityNumber: '123',
	epsrNumber: '11223344',
	organisationName: 'The Pensions Regulator',
	statutoryEmployer: 'statutory',
	address: {
		addressLine1: 'Napier House',
		addressLine2: 'Trafalgar Pl',
		addressLine3: '',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		country: '',
		countryId: 2,
	},
};

describe('Employer Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders with a section containing an aria label', () => {
		const { getByRole } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		assertThatASectionExistsWithAnAriaLabel(
			getByRole,
			employer.organisationName,
		);
	});
});

describe('Employer type', () => {
	test('Remove button is taken out of the tab flow', async () => {
		const { container, getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		getByText('Employer type').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();

		assertThatButtonHasBeenRemovedFromTheTabFlow(getByText, 'Remove');
	});
});

describe('Employer Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen date is required', async () => {
		const { getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText(/I confirm/i));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen checkbox is required', async () => {
		const { getByText, getByTestId } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen validation passes when required fields complete', async () => {
		const { getByText, getByTestId } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// confirm checkbox
		userEvent.click(getByText(/I confirm/i));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Are you sure you want to remove this employer?'),
		).toBeInTheDocument();
	});
});
