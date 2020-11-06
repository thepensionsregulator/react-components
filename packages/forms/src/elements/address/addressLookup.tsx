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
				/>
			);
	}
};
