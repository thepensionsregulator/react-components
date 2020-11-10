import React, { useState } from 'react';
import { Address } from './address';
import { EditAddress } from './editAddress';
import { PostcodeLookup } from './postcodeLookup';
import { SelectAddress } from './selectAddress';

export type AddressProps = {
	initialValue?: Address;
	testId?: string;
	onPostcodeChanged: (postcode: string) => Address[];
	onAddressSaved: (address: Address) => void;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
	changePostcodeButton: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
	addressLine1Label: string;
	addressLine1RequiredMessage: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
	saveAddressButton: string;
};

enum AddressView {
	PostcodeLookup,
	SelectAddress,
	EditAddress,
}

export const AddressLookup: React.FC<AddressProps> = ({
	initialValue,
	testId,
	onPostcodeChanged,
	onAddressSaved,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
	changePostcodeButton,
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
	saveAddressButton,
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
	const [address, setAddress] = useState<Address | null>(initialValue);
	const [postcode, setPostcode] = useState<string>(address && address.postcode);

	// Render a different child component depending on the state
	switch (addressView) {
		case AddressView.PostcodeLookup:
			return (
				<PostcodeLookup
					testId={testId}
					onPostcodeChanged={(postcode) => {
						setPostcode(postcode);
						setAddresses(onPostcodeChanged(postcode));
						setAddressView(AddressView.SelectAddress);
					}}
					invalidPostcodeMessage={invalidPostcodeMessage}
					postcodeLookupLabel={postcodeLookupLabel}
					postcodeLookupButton={postcodeLookupButton}
				/>
			);
		case AddressView.SelectAddress:
			return (
				<SelectAddress
					testId={testId}
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
					selectAddressLabel={selectAddressLabel}
					selectAddressPlaceholder={selectAddressPlaceholder}
					selectAddressButton={selectAddressButton}
					selectAddressRequiredMessage={selectAddressRequiredMessage}
					noAddressesFoundMessage={noAddressesFoundMessage}
				/>
			);
		case AddressView.EditAddress:
			return (
				<EditAddress
					initialValue={address}
					testId={testId}
					onChangeAddressClick={() =>
						setAddressView(AddressView.PostcodeLookup)
					}
					onAddressSaved={(savedAddress) => {
						setAddress(savedAddress);
						onAddressSaved(savedAddress);
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
					saveAddressButton={saveAddressButton}
				/>
			);
	}
};
