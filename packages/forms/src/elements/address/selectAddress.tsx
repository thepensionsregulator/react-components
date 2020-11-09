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
	postcodeLookupLabel: string;
	changePostcodeButton: string;
	selectAddressLabel: string;
	selectAddressPlaceholder?: string;
	selectAddressButton: string;
	selectAddressRequiredMessage: string;
	noAddressesFoundMessage: string;
};

export const SelectAddress: React.FC<SelectAddressProps> = ({
	testId,
	postcode,
	addresses,
	onChangePostcodeClick,
	onAddressSelected,
	postcodeLookupLabel,
	changePostcodeButton,
	selectAddressLabel,
	selectAddressPlaceholder,
	selectAddressButton,
	selectAddressRequiredMessage,
	noAddressesFoundMessage,
}) => {
	let options = addresses.map((address) => {
		return {
			value: address,
			label: Object.values(address).join(', '),
		};
	});

	let selectedAddressIsValid = true;

	const [selectedAddress, setSelectedAddress] = useState<Address | null>();

	return (
		<>
			<fieldset>
				<legend>{postcodeLookupLabel}</legend>
				<P>{postcode}</P>
				<Button
					onClick={onChangePostcodeClick}
					appearance="outlined"
					testId={(testId ? testId + '-' : '') + 'change-postcode'}
				>
					{changePostcodeButton}
				</Button>
			</fieldset>
			<FFSelect
				label={selectAddressLabel}
				name="address"
				options={options}
				inputWidth={6}
				onChange={(selectedItem) => setSelectedAddress(selectedItem.value)}
				testId={(testId ? testId + '-' : '') + 'select-address-list'}
				validate={(value) => {
					if (value) {
						selectedAddressIsValid = true;
						return undefined;
					} else {
						selectedAddressIsValid = false;
						return selectAddressRequiredMessage;
					}
				}}
				notFoundMessage={noAddressesFoundMessage}
				placeholder={selectAddressPlaceholder}
			/>
			<Button
				testId={(testId ? testId + '-' : '') + 'select-address-button'}
				onClick={() => {
					if (selectedAddressIsValid) {
						onAddressSelected(selectedAddress);
					}
				}}
			>
				{selectAddressButton}
			</Button>
		</>
	);
};
