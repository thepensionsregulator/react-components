import React from 'react';
import { render } from '@testing-library/react';
import { ThirdPartyCard } from '../cards/thirdParty/thirdParty';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { ThirdPartyProps } from '../cards/thirdParty/context';

const noop = () => Promise.resolve();

const thirdPartyAdmin: ThirdPartyProps = {
	id: '',
	schemeRoleId: '123',
	effectiveDate: '1997-04-01T00:00:00',
	organisationName: `McDonald's`,
	address: {
		addressLine1: 'Napier House',
		addressLine2: 'Trafalgar Pl',
		addressLine3: '',
		postTown: 'Brighton',
		postcode: 'BN1 4DW',
		county: 'West Sussex',
		countryId: '',
	},
};

describe('ThirdParty Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('ThirdParty Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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
			<ThirdPartyCard
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				thirdParty={thirdPartyAdmin}
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
			getByText('Are you sure you want to remove this third party admin?'),
		).toBeInTheDocument();
	});
});
