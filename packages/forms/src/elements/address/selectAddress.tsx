import React, { useState } from 'react';
import { FFSelect } from '../select/select';
import { P, Button } from '@tpr/core';
import { Address } from './address';

type SelectAddressProps = {
	testId?: string;
	postcode?: string;
	addresses: Address[];
	onChangePostcodeClick: () => void;
	onAddressSelected: (address: Address) => void;
};

export const SelectAddress: React.FC<SelectAddressProps> = ({
	testId,
	postcode,
	addresses,
	onChangePostcodeClick,
	onAddressSelected,
}) => {
	let options = addresses.map((address) => {
		return {
			value: address,
			label: Object.values(address).join(', '),
		};
	});

	const [selectedAddress, setSelectedAddress] = useState<Address | null>();

	return (
		<>
			<fieldset>
				<legend>Postcode</legend>
				<P>{postcode}</P>
				<Button
					onClick={onChangePostcodeClick}
					appearance="outlined"
					testId={testId + '-change-postcode'}
				>
					Change postcode
				</Button>
			</fieldset>
			<FFSelect
				label="Select an address"
				name="address"
				options={options}
				inputWidth={6}
				onChange={(selectedItem) => setSelectedAddress(selectedItem.value)}
			/>
			<Button
				testId={testId + '-select-address-button'}
				onClick={() => onAddressSelected(selectedAddress)}
			>
				Continue
			</Button>
		</>
	);
};
