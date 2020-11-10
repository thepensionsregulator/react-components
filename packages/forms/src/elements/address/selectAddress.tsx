import React, { useState } from 'react';
import { Form } from 'react-final-form';
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

	// Setting a 'valid' object is the only way to control validity of FFSelect.
	// validate() will run immediately. Initialise to null so that validate() can detect the initial load and set an initial value rather than validating.
	let [valid, setValid] = useState(null);

	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
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
						testId={(testId ? testId + '-' : '') + 'select-address-list'}
						validate={(value) => {
							// On initial load, setup the validation object
							if (!valid) {
								setValid({ error: '', touched: false });
								return;
							}

							// On subsequent runs, update the validation object.
							// In this case it can only go from invalid (initial load) to valid (address selected).
							// You can't select an invalid option from the list because there aren't any, and if you don't select one this never runs.
							if (value) {
								setValid({ touched: true, error: '' });
							}
						}}
						meta={valid}
						notFoundMessage={noAddressesFoundMessage}
						placeholder={selectAddressPlaceholder}
						readOnly={true}
					/>
					<Button
						testId={(testId ? testId + '-' : '') + 'select-address-button'}
						onClick={() => {
							// If validate() has set the 'valid' object to a valid state, continue; otherwise set it to an invalid state.
							if (valid && valid.touched && !valid.error) {
								onAddressSelected(values.address.value);
							} else {
								setValid({
									touched: true,
									error: selectAddressRequiredMessage,
								});
							}
						}}
					>
						{selectAddressButton}
					</Button>
				</>
			)}
		</Form>
	);
};
