import React, { useState } from 'react';
import { EditAddress } from './editAddress';
import { PostcodeLookup } from './postcodeLookup';
import { SelectAddress } from './selectAddress';

export type AddressProps = {
	testId?: string;
};

enum AddressView {
	PostcodeLookup,
	SelectAddress,
	EditAddress,
}

export const Address: React.FC<AddressProps> = ({ testId }) => {
	const [addressView, setAddressView] = useState<AddressView>(
		AddressView.PostcodeLookup,
	);

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
