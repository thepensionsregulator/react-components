import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import { Address } from './address';
import { FFSelect } from '../select/select';
import { P, Button, Link, Flex } from '@tpr/core';
import { ArrowRight } from '@tpr/icons';
import PostcodeFormatter from './postcodeFormatter';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';

type SelectAddressProps = {
	testId?: string;
	postcode?: string;
	addresses: Address[];
	onChangePostcodeClick: () => void;
	onAddressSelected: (address: Address) => void;
	postcodeLookupLabel: string;
	changePostcodeButton: string;
	changePostcodeAriaLabel?: string;
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
	changePostcodeAriaLabel,
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

	const form = useForm();
	const postcodeFormatter = new PostcodeFormatter();

	// Setting a 'valid' object appears to be the only way to control validity of FFSelect.
	// validate() will run immediately. Initialise to null so that validate() can detect the initial load and set an initial value rather than validating.
	let [selectAddressValid, setSelectAddressValid] = useState(null);

	return (
		<>
			<Flex>
				<P className={`${styles.nonEditable} ${styles.selectedPostcode}`}>
					<strong
						id={(testId ? testId + '-' : '') + 'postcode'}
						className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
					>
						{postcodeLookupLabel}
					</strong>{' '}
					<span aria-labelledby={(testId ? testId + '-' : '') + 'postcode'}>
						{postcodeFormatter.formatPostcode(postcode)}
					</span>
				</P>
				<Link
					onClick={onChangePostcodeClick}
					testId={(testId ? testId + '-' : '') + 'change-postcode'}
					className={styles.changePostcode}
					aria-label={changePostcodeAriaLabel}
				>
					{changePostcodeButton}
				</Link>
			</Flex>
			<FFSelect
				label={selectAddressLabel}
				name="selectedAddress"
				options={options}
				inputWidth={6}
				testId={(testId ? testId + '-' : '') + 'select-address-list'}
				validate={(value) => {
					// On initial load, setup the validation object
					if (!selectAddressValid) {
						setSelectAddressValid({ error: '', touched: false });
						return;
					}
					// On subsequent runs, update the validation object.
					// In this case it can only go from invalid (initial load) to valid (address selected).
					// You can't select an invalid option from the list because there aren't any, and if you don't select one this never runs.
					if (value) {
						setSelectAddressValid({ touched: true, error: '' });
					}
				}}
				meta={selectAddressValid}
				notFoundMessage={noAddressesFoundMessage}
				placeholder={selectAddressPlaceholder}
				readOnly={true}
				selectedItem={{}} // don't reselect if the same address turns up again
			/>
			<Button
				testId={(testId ? testId + '-' : '') + 'select-address-button'}
				onClick={() => {
					// If validate() has set the 'valid' object to a valid state, continue; otherwise set it to an invalid state.
					const selectedAddressField = form.getFieldState('selectedAddress');
					if (
						selectAddressValid &&
						selectAddressValid.touched &&
						!selectAddressValid.error &&
						selectedAddressField &&
						selectedAddressField.value.value
					) {
						onAddressSelected(selectedAddressField.value.value);
					} else {
						setSelectAddressValid({
							touched: true,
							error: selectAddressRequiredMessage,
						});
					}
				}}
				className={`${styles.button} ${styles.arrowButton}`}
			>
				<Flex
					cfg={{
						alignItems: 'center',
						pl: 4,
						pr: 2,
					}}
				>
					{selectAddressButton}
					<ArrowRight cfg={{ fill: 'white' }} width={'32'} />
				</Flex>
			</Button>
		</>
	);
};
