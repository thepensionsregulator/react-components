import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { fireEvent, screen, findByText, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { AddressLookup } from '../elements/address/addressLookup';
import FakeAddressLookupProvider from '../elements/address/fakeAddressLookupProvider';
import { AddressProps } from '../elements/address/types';

const defaultProps: AddressProps = {
	loading: false,
	setLoading: () => {},
	invalidPostcodeMessage: 'Enter a valid postcode',
	postcodeLookupLabel: 'Postcode',
	postcodeLookupButton: 'Find address',
	addressLookupProvider: null,
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
	onValidatePostcode: jest.fn(),
	onAddressChanging: jest.fn(),
};

async function searchForAPostcode(postcode: string) {
	const input = await screen.findByTestId('postcode-lookup-edit');
	userEvent.type(input, postcode);
	fireEvent.blur(input);

	const submit = await screen.findByTestId('postcode-lookup-button');
	fireEvent.click(submit);
}

beforeEach(() => {
	defaultProps.addressLookupProvider = new FakeAddressLookupProvider();
});

afterEach(() => {
	cleanup();
});

describe('Address lookup', () => {
	describe('postcode lookup view', () => {
		test('to be the default when initialValue is null', async () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			expect(getByTestId('postcode-lookup-edit')).toBeDefined();
		});
		test('to be the default when all properties of initialValue are falsy', async () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} initialValue={{}} />,
			});
			expect(getByTestId('postcode-lookup-edit')).toBeDefined();
		});
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
		test('should use autocomplete="postal-code"', () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			const input = getByTestId('postcode-lookup-edit');
			expect(input).toHaveAttribute('autocomplete', 'postal-code');
		});
		test('should go to select address view when button is clicked', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			await searchForAPostcode(FakeAddressLookupProvider.tprAddress.postcode);
			const changePostcode = container.querySelector(
				'button[data-testid$="change-postcode"]',
			);
			expect(changePostcode).not.toBeNull();
		});
		test('should validate the postcode when button is clicked', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			await searchForAPostcode('AB12 3MV'); // invalid postcode due to MV in the incode
			const errorMessage = findByText(
				container,
				defaultProps.invalidPostcodeMessage,
			);
			expect(errorMessage).not.toBeNull();
		});
		test('to have a required attribute', async () => {
			const { getByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} initialValue={{}} />,
			});
			expect(getByTestId('postcode-lookup-edit')).toHaveAttribute('required');
		});
	});

	describe('select address view', () => {
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			await searchForAPostcode(FakeAddressLookupProvider.tprAddress.postcode);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('should list matching addresses', async () => {
			const { findByTestId, findByText, findAllByRole } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			await searchForAPostcode(FakeAddressLookupProvider.tprAddress.postcode);

			const displayedPostcode = await findByText(
				FakeAddressLookupProvider.tprAddress.postcode,
			);
			expect(displayedPostcode).toBeDefined();

			const selectAddressInput = await findByTestId('select-address-list');
			selectAddressInput.click();

			const addressOptions = await findAllByRole('option');

			expect(addressOptions[0].textContent).toMatch(
				FakeAddressLookupProvider.tprAddress.addressLine1,
			);
		});

		test('should pass selected address to edit address view', async () => {
			const { findByTestId, findByDisplayValue, findAllByRole } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			await searchForAPostcode(FakeAddressLookupProvider.tprAddress.postcode);

			const selectAddressInput = await findByTestId('select-address-list');
			selectAddressInput.click();

			const addressOptions = await findAllByRole('option');
			addressOptions[0].click();
			const selectAddressButton = await findByTestId('select-address-button');
			selectAddressButton.click();

			const addressLine1Input = await findByDisplayValue(
				FakeAddressLookupProvider.tprAddress.addressLine1,
			);
			expect(addressLine1Input).toBeDefined();
		});
		test('should call onValidatePostcode when select address button is clicked', async () => {
			const { findByTestId } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			await searchForAPostcode(FakeAddressLookupProvider.tprAddress.postcode);

			const selectAddressInput = await findByTestId('select-address-list');
			selectAddressInput.click();
			const addressOptions = await screen.findAllByRole('option');
			addressOptions[0].click();
			const selectAddressButton = await findByTestId('select-address-button');
			selectAddressButton.click();
			expect(defaultProps.onValidatePostcode).toHaveBeenCalled();
		});
	});

	describe('edit address view', () => {
		test('to be the default when initialValue is not null', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						{...defaultProps}
						initialValue={FakeAddressLookupProvider.tprAddress}
					/>
				),
			});
			const input = container.querySelector('input[name="addressLine1"]');
			expect(input).not.toBeNull();
		});
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						{...defaultProps}
						initialValue={FakeAddressLookupProvider.tprAddress}
					/>
				),
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
		test('should use autocomplete attribute for address lines 1 & 2', () => {
			const { getByTestId } = formSetup({
				render: (
					<AddressLookup
						{...defaultProps}
						initialValue={FakeAddressLookupProvider.tprAddress}
					/>
				),
			});

			const addressLine1 = getByTestId('addressLine1');
			const addressLine2 = getByTestId('addressLine2');
			expect(addressLine1).toHaveAttribute('autocomplete', 'address-line1');
			expect(addressLine2).toHaveAttribute('autocomplete', 'address-line2');
		});
		test('to go to postcode lookup view when button clicked', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						{...defaultProps}
						initialValue={FakeAddressLookupProvider.tprAddress}
					/>
				),
			});
			const button = container.querySelector(
				'button[data-testid$="change-address"]',
			);
			fireEvent.click(button);
			const input = container.querySelector('input[name="postcodeLookup"]');
			expect(input).not.toBeNull();
		});
		test('address line 1 to have a required attribute', async () => {
			const { getByTestId } = formSetup({
				render: (
					<AddressLookup
						{...defaultProps}
						initialValue={FakeAddressLookupProvider.tprAddress}
					/>
				),
			});
			expect(getByTestId('addressLine1')).toHaveAttribute('required');
		});
	});
});
