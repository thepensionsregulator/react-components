import React from 'react';
import { render } from '@testing-library/react';
import { InsurerCard } from '../cards/insurer/insurer';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Insurer } from '../cards/insurer/context';

// TODO: write more tests

const noop = () => Promise.resolve();

const insurer: Insurer = {
	id: '',
	schemeRoleId: '123',
	effectiveDate: '1997-04-01T00:00:00',
	organisationReference: 123,
	organisationName: 'Some Organisation Name',
	insurerCompanyReference: '12345678',
	address: {
		addressLine1: 'Napier House',
		addressLine2: 'Trafalgar Pl',
		addressLine3: '',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		countryId: '',
	},
	telephoneNumber: '01273 222 111',
	emailAddress: 'john.wick@warnerbros.com',
};

describe('Insurer Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Insurer Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
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
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
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
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
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
			<InsurerCard
				onSaveRef={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				insurer={insurer}
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
			getByText('Are you sure you want to remove this insurer?'),
		).toBeInTheDocument();
	});
});
