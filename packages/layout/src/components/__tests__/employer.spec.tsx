import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { EmployerCard } from '../cards/employer/employer';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Employer } from '../cards/employer/context';
import {
	assertThatASectionExistsWithAnAriaLabel,
	assertThatButtonHasBeenRemovedFromTheTabFlow,
	assertMainHeadingExists,
	assertRemoveButtonExists,
	assertHeadingsExist,
} from '../testHelpers/testHelpers';
import { sampleAddress } from '../testHelpers/commonData/cards';

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
	address: sampleAddress,
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

	test('renders buttons correctly', () => {
		const { getByText, getByTestId, getAllByTestId, container } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		expect(container.querySelector('button')).not.toBe(null);

		assertMainHeadingExists(getByText, getByTestId, 'Employer type', true);

		assertRemoveButtonExists(getByText, getByTestId);

		const h4Headings = ['Employer', 'Employer Identifiers'];
		assertHeadingsExist(getAllByTestId, h4Headings);
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

	test('replaces __NAME__ in the checkbox label', () => {
		const { findByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				complete={true}
				employer={employer}
			/>,
		);

		expect(
			findByText(`Confirm '${employer.organisationName}' is correct.`),
		).toBeDefined();
	});
});

describe('Employer type', () => {
	afterEach(() => {
		cleanup();
	});

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
	afterEach(() => {
		cleanup();
	});

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
