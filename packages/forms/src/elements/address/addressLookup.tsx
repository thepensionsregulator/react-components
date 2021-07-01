import React, { useState } from 'react';
import { Address } from './types/address';
import { PostcodeLookup } from './postcodeLookup';
import { SelectAddress } from './selectAddress';
import { EditAddress } from './editAddress';
import { act } from 'react-dom/test-utils';
import { AddressProps } from './types';
import { useEffect } from 'react';

export enum AddressView {
	PostcodeLookup,
	SelectAddress,
	EditAddress,
}

export const AddressLookup: React.FC<AddressProps> = ({
	initialValue = {},
	loading,
	setLoading,
	testId,
	addressLookupProvider,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
	changePostcodeButton,
	changePostcodeAriaLabel,
	selectAddressLabel,
	selectAddressPlaceholder,
	selectAddressButton,
	selectAddressRequiredMessage,
	noAddressesFoundMessage,
	addressLine1Label,
	addressLine1RequiredMessage,
	addressLine2Label,
	addressLine3Label,
	townLabel,
	countyLabel,
	postcodeLabel,
	countryLabel,
	changeAddressButton,
	findAddressCancelledButton,
	onFindAddressCancelled,
	onValidatePostcode,
	onAddressChanging,
	setSubmitButton,
}) => {
	// Start in postcode lookup view, unless there's already an address in which case start in edit address view
	let initialView = AddressView.PostcodeLookup;
	if (
		initialValue &&
		(initialValue.addressLine1 ||
			initialValue.addressLine2 ||
			initialValue.addressLine3 ||
			initialValue.postTown ||
			initialValue.county ||
			initialValue.postcode)
	) {
		initialView = AddressView.EditAddress;
	}
	const [addressView, setAddressView] = useState<AddressView>(initialView);
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [address, setAddress] = useState<Address | null>(null);
	const [postcode, setPostcode] = useState<string>(null);

	useEffect(() => {
		if (setSubmitButton) {
			setSubmitButton(addressView === AddressView.EditAddress);
		}
	}, [addressView]);

	// Render a different child component depending on the state
	return (
		<>
			{addressView === AddressView.PostcodeLookup && (
				<PostcodeLookup
					postcode={postcode}
					loading={loading}
					testId={testId}
					onPostcodeChanged={(newPostcode) => {
						setPostcode(newPostcode);
						setLoading(true);
						addressLookupProvider
							.lookupAddress(newPostcode)
							.then((rawAddresses) => {
								addressLookupProvider
									.transformResults(rawAddresses)
									.then((processedResults) => {
										act(() => setAddresses(processedResults));
										setLoading(false);
									});
							})
							.catch((err) => {
								console.log(err);
								setLoading(false);
							});
						setAddressView(AddressView.SelectAddress);
					}}
					invalidPostcodeMessage={invalidPostcodeMessage}
					postcodeLookupLabel={postcodeLookupLabel}
					postcodeLookupButton={postcodeLookupButton}
					findAddressCancelledButton={findAddressCancelledButton}
					onFindAddressCancelled={onFindAddressCancelled}
				/>
			)}
			{addressView === AddressView.SelectAddress && (
				<SelectAddress
					testId={testId}
					loading={loading}
					postcode={postcode}
					addresses={addresses}
					onChangePostcodeClick={() =>
						setAddressView(AddressView.PostcodeLookup)
					}
					onAddressSelected={(selectedAddress) => {
						setAddress(selectedAddress);
						setAddressView(AddressView.EditAddress);
					}}
					postcodeLookupLabel={postcodeLookupLabel}
					changePostcodeButton={changePostcodeButton}
					changePostcodeAriaLabel={changePostcodeAriaLabel}
					selectAddressLabel={selectAddressLabel}
					selectAddressPlaceholder={selectAddressPlaceholder}
					selectAddressButton={selectAddressButton}
					selectAddressRequiredMessage={selectAddressRequiredMessage}
					noAddressesFoundMessage={noAddressesFoundMessage}
					onValidatePostcode={(isValid) => {
						if (onAddressChanging && isValid) {
							onAddressChanging(isValid);
						}
						if (onValidatePostcode) {
							onValidatePostcode(isValid);
						}
					}}
				/>
			)}
			{addressView === AddressView.EditAddress && (
				<EditAddress
					initialValue={initialValue}
					loading={loading}
					value={address}
					testId={testId}
					onChangeAddressClick={() => {
						if (onAddressChanging) {
							onAddressChanging(false);
						}
						setAddressView(AddressView.PostcodeLookup);
					}}
					addressLine1Label={addressLine1Label}
					addressLine1RequiredMessage={addressLine1RequiredMessage}
					addressLine2Label={addressLine2Label}
					addressLine3Label={addressLine3Label}
					townLabel={townLabel}
					countyLabel={countyLabel}
					postcodeLabel={postcodeLabel}
					countryLabel={countryLabel}
					changeAddressButton={changeAddressButton}
				/>
			)}
		</>
	);
};
