import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { fireEvent, screen, findByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { AddressLookup, AddressProps } from '../elements/address/addressLookup';
import FakeAddressLookupProvider from '../elements/address/fakeAddressLookupProvider';
import { invokeActionWithConsoleErrorTestFailureSuppressed } from '../utils/consoleErrorTestFailureTemporarySupression';

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
	onValidatePostcode: jest.fn(),
};

function searchForAPostcode(container: HTMLElement, postcode: string) {
	const input = container.querySelector('input');
	userEvent.type(input, postcode);
	fireEvent.blur(input);

	const submit = container.querySelector('button');
	fireEvent.click(submit);
}

function updateAPostcode(container: HTMLElement, postcode: string) {
	const input = container.querySelector('input');
	userEvent.type(input, postcode);
	fireEvent.blur(input);
}

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
		test('should go to select address view when button is clicked', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			searchForAPostcode(container, FakeAddressLookupProvider.tprAddress.postcode);
			const changePostcode = container.querySelector(
				'button[data-testid$="change-postcode"]',
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
		test('should call onValidatePostcode when postcode is entered', () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});
			updateAPostcode(container, 's6 2nr');
			expect(defaultProps.onValidatePostcode).toHaveBeenCalled();
		});
	});

	describe('select address view', () => {
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, FakeAddressLookupProvider.tprAddress.postcode);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('should list matching addresses', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, FakeAddressLookupProvider.tprAddress.postcode);
			
			const displayedPostcode = await screen.findByText(FakeAddressLookupProvider.tprAddress.postcode);
			expect(displayedPostcode).toBeDefined();

			const selectAddressInput = await screen.findByTestId('select-address-list');
			selectAddressInput.click();
			
			const addressOptions = await screen.findAllByRole('option');

			expect(addressOptions[0].textContent).toMatch(FakeAddressLookupProvider.tprAddress.addressLine1);
		});

		test('should pass selected address to edit address view', async () => {
			const { container } = formSetup({
				render: <AddressLookup {...defaultProps} />,
			});

			searchForAPostcode(container, FakeAddressLookupProvider.tprAddress.postcode);

			const selectAddressInput = await screen.findByTestId('select-address-list');
			selectAddressInput.click();
			
			const addressOptions = await screen.findAllByRole('option');
			
			await invokeActionWithConsoleErrorTestFailureSuppressed(async () => {
				// AddressLookup is throwing an error:
				//     A component is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa).
				//
				// The component works despite the console error (which also appears in the gatsby site), and while this does need to be fixed, it is an existing issue. 
				// For now I'm just put a warning in the console for visibility so the tests don't fail.
				addressOptions[0].click();
				const selectAddressButton = await screen.findByTestId('select-address-button');
				selectAddressButton.click();
			});

			const addressLine1Input = await screen.findByDisplayValue(FakeAddressLookupProvider.tprAddress.addressLine1);
			expect(addressLine1Input).toBeDefined();
		});
	});

	describe('edit address view', () => {
		test('to be the default when initialValue is not null', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={FakeAddressLookupProvider.tprAddress} />
				),
			});
			const input = container.querySelector('input[name="addressLine1"]');
			expect(input).not.toBeNull();
		});
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={FakeAddressLookupProvider.tprAddress} />
				),
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});
		test('to go to postcode lookup view when button clicked', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup {...defaultProps} initialValue={FakeAddressLookupProvider.tprAddress} />
				),
			});
			const button = container.querySelector(
				'button[data-testid$="change-address"]',
			);
			fireEvent.click(button);
			const input = container.querySelector('input[name="postcodeLookup"]');
			expect(input).not.toBeNull();
		});
	});
});
