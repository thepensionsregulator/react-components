import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { findByText, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { AddressLookup, AddressProps } from '../elements/address/addressLookup';
import FakeAddressLookupProvider from '../elements/address/fakeAddressLookupProvider';

const exampleAddress = {
	addressLine1: 'Napier House',
	addressLine2: 'Trafalgar Place',
	addressLine3: 'Trafalgar Road',
	postTown: 'Brighton',
	county: 'East Sussex',
	postcode: 'BN1 4DW',
	country: 'UK',
	countryId: 229,
};

const addressLookupProvider = new FakeAddressLookupProvider();

const defaultProps: AddressProps = {
	loading: false,
	setLoading: () => {},
	invalidPostcodeMessage: 'Enter a valid postcode',
	postcodeLookupLabel: 'Postcode',
	postcodeLookupButton: 'Find address',
	addressLookupProvider: addressLookupProvider,
	changePostcodeButton: 'Change postcode',
	selectAddressLabel: 'Select an address',
	selectAddressButton: 'Select address',
	selectAddressRequiredMessage: 'Select an address to continue',
	noAddressesFoundMessage: 'No matching addresses were found',
	addressLine1Label: 'Address line 1',
	addressLine1RequiredMessage: 'You must complete this field',
	addressLine2Label: 'Address line 2',
	addressLine3Label: 'Address line 3',
	townLabel: 'Post town',
	countyLabel: 'County',
	postcodeLabel: 'Postcode',
	countryLabel: 'Country',
	changeAddressButton: 'I need to change the address',
};

function searchForAPostcode(container: HTMLElement, postcode: string) {
	const input = container.querySelector('input');
	userEvent.type(input, postcode);
	fireEvent.blur(input);

	const submit = container.querySelector('button');
	fireEvent.click(submit);
}

function openAddressDropdown(container: HTMLElement) {
	const openSelect = container.querySelector(
		'button[data-testid="select-address-list-button"]',
	);
	fireEvent.click(openSelect);
}

describe('Address lookup', () => {
	describe('postcode lookup view', () => {
		test('to be the default when initialValue is null', async () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			expect(getByTestId('postcode-lookup-edit')).toBeInTheDocument();
		});

		test('to be the default when all properties of initialValue are falsy', async () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} initialValue={{}} />,
			});

			expect(getByTestId('postcode-lookup-edit')).toBeInTheDocument();
		});

		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('should go to select address view when button is clicked', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const changePostcode = container.querySelector(
				'a[data-testid$="change-postcode"]',
			);

			expect(changePostcode).not.toBeNull();
		});

		test('should validate the postcode when button is clicked', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, 'AB12 3MV'); // invalid postcode due to MV in the incode

			const errorMessage = findByText(
				container,
				defaultProps.invalidPostcodeMessage,
			);

			expect(errorMessage).not.toBeNull();
		});
	});

	describe('select address view', () => {
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('should display the postcode', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const displayedPostcode = findByText(container, exampleAddress.postcode);

			expect(displayedPostcode).not.toBeNull();
		});

		test('should list matching addresses', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, exampleAddress.postcode);

			openAddressDropdown(container);

			setTimeout(() => {
				const option = container.querySelector('div[role="option"]');
				expect(option.textContent).toMatch(exampleAddress.addressLine1);
			}, 3000);
		});

		test('should pass selected address to edit address view', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, exampleAddress.postcode);

			openAddressDropdown(container);

			setTimeout(() => {
				const option = container.querySelector('div[role="option"]');
				fireEvent.click(option);

				const selectAddress = container.querySelector(
					'button[data-testid$="select-address-button"]',
				);
				fireEvent.click(selectAddress);

				const input = container.querySelector('input[name="addressLine1"]');

				expect(input).toHaveAttribute('value', exampleAddress.addressLine1);
			}, 3000);
		});
	});

	describe('edit address view', () => {
		test('to be the default when initialValue is not null', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={exampleAddress} />
				),
			});

			const input = container.querySelector('input[name="addressLine1"]');
			expect(input).not.toBeNull();
		});

		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={exampleAddress} />
				),
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('to go to postcode lookup view when button clicked', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={exampleAddress} />
				),
			});

			const button = container.querySelector(
				'a[data-testid$="change-address"]',
			);
			fireEvent.click(button);

			const input = container.querySelector('input[name="postcodeLookup"]');
			expect(input).not.toBeNull();
		});
	});
});
