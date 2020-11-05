import React, { useState } from 'react';
import { Address } from './address';
import { EditAddress } from './editAddress';
import { PostcodeLookup } from './postcodeLookup';
import { SelectAddress } from './selectAddress';

export type AddressProps = {
	address?: Address;
	testId?: string;
};

enum AddressView {
	PostcodeLookup,
	SelectAddress,
	EditAddress,
}

export const AddressLookup: React.FC<AddressProps> = ({ address, testId }) => {
	// Start in postcode lookup view, unless there's already an address in which case start in edit address view
	let initialView = AddressView.PostcodeLookup;
	if (
		address &&
		(address.addressLine1 ||
			address.addressLine2 ||
			address.addressLine3 ||
			address.postTown ||
			address.county ||
			address.postcode)
	) {
		initialView = AddressView.EditAddress;
	}
	const [addressView, setAddressView] = useState<AddressView>(initialView);

	// Render a different child component depending on the state
	switch (addressView) {
		case AddressView.PostcodeLookup:
			return (
				<>
					<PostcodeLookup testId={testId} />
					<button onClick={() => setAddressView(AddressView.SelectAddress)}>
						Next
					</button>
				</>
			);
		case AddressView.SelectAddress:
			return (
				<>
					<SelectAddress testId={testId} />
					<button onClick={() => setAddressView(AddressView.EditAddress)}>
						Next
					</button>
				</>
			);
		case AddressView.EditAddress:
			return (
				<>
					<EditAddress testId={testId} />
					<button onClick={() => setAddressView(AddressView.PostcodeLookup)}>
						Next
					</button>
				</>
			);
	}
};
