import React from 'react';
import {
	getAllByLabelText,
	getAllByText,
	getByDisplayValue,
	getByLabelText,
	render,
	waitFor,
} from '@testing-library/react';
import { InHouseCard } from '../cards/inHouse/inHouse';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { InHouseAdminNoApi } from '../cards/inHouse/context';

// TODO: write more tests

const noop = () => Promise.resolve();

const inHouseAdmin: InHouseAdminNoApi = {
	id: '',
	schemeRoleId: '123',
	title: 'Mr',
	firstname: 'John',
	lastname: 'Smoth',
	effectiveDate: '1997-04-01T00:00:00',
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

describe('InHouse Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('InHouse Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
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
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
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
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
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
			<InHouseCard
				onSaveContacts={noop}
				onSaveAddress={noop}
				onSaveName={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				addressAPI={{
					get: (_endpont) => Promise.resolve(),
					limit: 100,
				}}
				inHouseAdmin={inHouseAdmin}
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
			getByText('Are you sure you want to remove this in house admin?'),
		).toBeInTheDocument();
	});

	describe('InHouse Auto Address', () => {
		test('is accessible', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			getByText('Address').click();

			// wait for initial postcode to be loaded
			await waitFor(() => {});

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('invalid postcodes disable the find address function', async () => {
			inHouseAdmin.address.postcode = 'INVALID POSTCODE';

			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			getByText('Address').click();
			await waitFor(() => {});

			getByText('Change').click();
			await waitFor(() => {});

			expect(getByDisplayValue(container, inHouseAdmin.address.postcode))
				.toBeDefined;
			expect(getByText('Find Address')).toBeDisabled();

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
	});

	describe('InHouse Manual Address', () => {
		test('is accessible', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			getByText('Address').click();

			// wait for initial postcode to be loaded
			await waitFor(() => {});

			getByText(`I can't find my address in the list`).click();

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('address line 1 is required', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			await navigateToManuallyEnteredAddress(getByText);

			expect(getByText(`Address line 1`).nextSibling.textContent).toEqual(
				'This is a required field',
			);

			userEvent.type(getByLabelText(container, `Address line 1`), 'a');

			expect(getByText(`Address line 1`).nextSibling.textContent).toEqual(
				'Must be at least 2 chars',
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('city is required', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			await navigateToManuallyEnteredAddress(getByText);
			await fillInAddressLine1(container);

			expect(getByText(`City`).nextSibling.textContent).toEqual(
				'This is a required field',
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('valid postcode is required', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			await navigateToManuallyEnteredAddress(getByText);
			await fillInAddressLine1(container);
			await fillInCity(container);

			let addressElement = getByText(`Address`).parentElement;

			userEvent.clear(getAllByLabelText(addressElement, 'Postcode')[0]);
			expect(getAllByLabelText(addressElement, 'Postcode')[0]).toBeDefined();

			expect(
				getAllByText(addressElement, 'Postcode')[0].nextSibling.textContent,
			).toEqual('This is a required field');

			userEvent.type(
				getAllByLabelText(addressElement, 'Postcode')[0],
				'INVALID POSTCODE',
			);

			expect(
				getAllByText(addressElement, 'Postcode')[0].nextSibling.textContent,
			).toEqual('Incorrect postcode format');

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('county is required', async () => {
			const { container, getByText } = render(
				<InHouseCard
					onSaveContacts={noop}
					onSaveAddress={noop}
					onSaveName={noop}
					onRemove={noop}
					onCorrect={(_value) => {}}
					complete={true}
					addressAPI={{
						get: (_endpont) => Promise.resolve(),
						limit: 100,
					}}
					inHouseAdmin={inHouseAdmin}
				/>,
			);

			await navigateToManuallyEnteredAddress(getByText);
			await fillInAddressLine1(container);
			await fillInCity(container);
			await fillInPostcode(container);

			expect(getByText(`County`).nextSibling.textContent).toEqual(
				'This is a required field',
			);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		const navigateToManuallyEnteredAddress = async (getByText) => {
			getByText('Address').click();
			await waitFor(() => {});

			getByText(`I can't find my address in the list`).click();
			await waitFor(() => {});

			getByText('Save and close').click();
			await waitFor(() => {});
		};

		const fillInAddressLine1 = async (container) => {
			userEvent.type(
				getByLabelText(container, 'Address line 1'),
				'Valid address line 1',
			);
		};

		const fillInCity = async (container) => {
			userEvent.type(getByLabelText(container, 'City'), 'Valid city');
		};

		const fillInPostcode = async (container) => {
			userEvent.clear(getAllByLabelText(container, 'Postcode')[0]);
			userEvent.type(getByLabelText(container, 'Postcode'), 'BN11AA');
		};
	});
});
