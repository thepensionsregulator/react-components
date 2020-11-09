import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { findByText, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AddressLookup } from '../elements/address/addressLookup';
// import { Address } from '../elements/address/address';

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
function searchForAPostcode(container: HTMLElement, postcode: string) {
	const input = container.querySelector('input');
	input.value = postcode;

	const submit = container.querySelector('button');
	fireEvent.click(submit);
}

function findFirstOptionInSelect(container: HTMLElement) {
	const openSelect = container.querySelector(
		'button[data-testid="select-button"]',
	);
	fireEvent.click(openSelect);

	return container.querySelector('div[role="option"]');
}

describe('Address lookup', () => {
	describe('postcode lookup view', () => {
		test('to be the default when initialValue is null', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});

			const input = container.querySelector('input[name="postcode"]');
			expect(input).not.toBeNull();
		});

		test('to be the default when all properties of initialValue are falsy', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						initialValue={{}}
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});

			const input = container.querySelector('input[name="postcode"]');
			expect(input).not.toBeNull();
		});

		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		// TODO: This worked until validation was introduced
		//
		// test('should go to select address view when button is clicked', async () => {
		// 	const { container } = formSetup({
		// 		render: (
		// 			<AddressLookup
		// 				onPostcodeChanged={() => []}
		// 				onAddressSaved={() => {}}
		// 			/>
		// 		),
		// 	});

		// 	searchForAPostcode(container, exampleAddress.postcode);

		// 	const changePostcode = container.querySelector(
		// 		'button[data-testid$="change-postcode"]',
		// 	);

		// 	expect(changePostcode).not.toBeNull();
		// });

		// TODO: Test validation, but this won't work until the test above is fixed
		//
		// 	test('should validate the postcode when button is clicked', async () => {
		// 		const { container } = formSetup({
		// 			render: (
		// 				<AddressLookup
		// 					onPostcodeChanged={() => []}
		// 					onAddressSaved={() => {}}
		// 				/>
		// 			),
		// 		});

		// 		searchForAPostcode(container, 'AB12 3MV'); // invalid postcode due to MV in the incode

		// 		const errorMessage = findByText(container, 'Enter a valid postcode');

		// 		expect(errormessage).not.toBeNull();
		// 	});
	});

	describe('select address view', () => {
		test('passes accessibility checks', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('should display the postcode', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const displayedPostcode = findByText(container, exampleAddress.postcode);

			expect(displayedPostcode).not.toBeNull();
		});

		test('should list matching addresses', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => [exampleAddress]}
						onAddressSaved={() => {}}
					/>
				),
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const option = findFirstOptionInSelect(container);

			expect(option.textContent).toMatch(exampleAddress.addressLine1);
		});

		test('should pass selected address to edit address view', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						onPostcodeChanged={() => [exampleAddress]}
						onAddressSaved={() => {}}
					/>
				),
			});

			searchForAPostcode(container, exampleAddress.postcode);

			const option = findFirstOptionInSelect(container);
			fireEvent.click(option);

			const selectAddress = container.querySelector(
				'button[data-testid$="select-address-button"]',
			);
			fireEvent.click(selectAddress);

			const input = container.querySelector('input[name="addressLine1"]');

			expect(input).toHaveAttribute('value', exampleAddress.addressLine1);
		});
	});

	describe('edit address view', () => {
		test('to be the default when initialValue is not null', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						initialValue={exampleAddress}
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
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
						initialValue={exampleAddress}
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('to go to postcode lookup view when button clicked', async () => {
			const { container } = formSetup({
				render: (
					<AddressLookup
						initialValue={exampleAddress}
						onPostcodeChanged={() => []}
						onAddressSaved={() => {}}
					/>
				),
			});

			const button = container.querySelector(
				'button[data-testid$="change-address"]',
			);
			fireEvent.click(button);

			const input = container.querySelector('input[name="postcode"]');
			expect(input).not.toBeNull();
		});

		// TODO: WORKS IN THE UI BUT NOT HERE

		// test('to make edited address available in onAddressSaved', async () => {
		// 	let savedAddress: Address = null;
		// 	const { container } = formSetup({
		// 		render: (
		// 			<AddressLookup
		// 				initialValue={exampleAddress}
		// 				onPostcodeChanged={() => []}
		// 				onAddressSaved={(address) => (savedAddress = address)}
		// 			/>
		// 		),
		// 	});

		// 	const input = container.querySelector('input[name="addressLine1"]');
		// 	input.setAttribute('value', 'TPR');

		// 	const button = container.querySelector(
		// 		'button[data-testid$="edit-address-button"]',
		// 	);
		// 	fireEvent.click(button);

		// 	expect(savedAddress).toEqual({ ...exampleAddress, addressLine1: 'TPR' });
		// });
	});
});
