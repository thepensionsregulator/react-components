import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-final-form';
import { ArrowRight } from '@tpr/icons';
import { P, Button, Flex } from '@tpr/core';
import { FFSelect } from '../select/select';
import { Address, SelectAddressProps } from './types';
import { formatPostcode } from './services';
import styles from './addressLookup.module.scss';
import elementStyles from '../elements.module.scss';

export const SelectAddress: React.FC<SelectAddressProps> = ({
	loading,
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
	onValidatePostcode,
}) => {
	// if missing fields are undefined rather than empty string they remain at their previous values
	const ensureNoUndefinedFields = (addresses: Address[]) => {
		return addresses && addresses.length
			? addresses.map((address) => {
					return {
						addressLine1: address.addressLine1 || '',
						addressLine2: address.addressLine2 || '',
						addressLine3: address.addressLine3 || '',
						postTown: address.postTown || '',
						county: address.county || '',
						postcode: address.postcode || '',
						nationId: address.nationId || null,
						country: address.country || '',
						countryId: address.countryId || null,
						uprn: address.uprn || null,
					};
			  })
			: [];
	};

	const addressesToTransform = ensureNoUndefinedFields(addresses);
	let options = addressesToTransform.map((address) => {
		return {
			value: address,
			label: [
				address.addressLine1,
				address.addressLine2,
				address.addressLine3,
				address.postTown,
				address.county,
				address.postcode,
				address.country,
			]
				.filter((x) => (x ? true : false))
				.join(', '),
		};
	});

	const form = useForm();

	// Setting a 'valid' object appears to be the only way to control validity of FFSelect.
	// validate() will run immediately. Initialise to null so that validate() can detect the initial load and set an initial value rather than validating.
	let [selectAddressValid, setSelectAddressValid] = useState({
		touched: false,
		error: '',
	});

	const getAddressIfValid = (): Address | undefined => {
		if (
			selectAddressValid &&
			selectAddressValid.touched &&
			!selectAddressValid.error &&
			dropdownRef.current &&
			dropdownRef.current.value
		) {
			return JSON.parse(dropdownRef.current.value);
		}
	};

	const clearSelectedAddress = (): void => {
		const selectedAddressField = form.getFieldState('selectedAddress');
		if (
			selectedAddressField &&
			selectedAddressField.value &&
			selectedAddressField.value.value
		) {
			selectedAddressField.value.value = null;
		}
	};

	const updateAddressValidationIfChanged = (updatedSelectAddressValid) => {
		if (
			selectAddressValid.touched !== updatedSelectAddressValid.touched ||
			selectAddressValid.error !== updatedSelectAddressValid.error
		) {
			setSelectAddressValid(updatedSelectAddressValid);
		}
	};

	const handleOnClick = () => {
		// If validate() has set the 'valid' object to a valid state, continue; otherwise set it to an invalid state.
		const validAddress = getAddressIfValid();
		let isValidAddress = false;
		if (validAddress) {
			isValidAddress = true;
			onAddressSelected(validAddress);
			clearSelectedAddress();
		} else {
			updateAddressValidationIfChanged({
				touched: true,
				error: selectAddressRequiredMessage,
			});
		}
		if (onValidatePostcode !== null) {
			onValidatePostcode(isValidAddress);
		}
	};

	const dropdownRef = useRef<HTMLSelectElement>(null);
	useEffect(() => {
		dropdownRef.current && dropdownRef.current.focus();
	}, [loading]);

	return (
		<>
			<Flex cfg={{ alignItems: 'center' }}>
				<P className={`${styles.nonEditable} ${styles.selectedPostcode}`}>
					<strong
						id={(testId ? testId + '-' : '') + 'postcode'}
						className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
					>
						{postcodeLookupLabel}
					</strong>{' '}
					<span aria-labelledby={(testId ? testId + '-' : '') + 'postcode'}>
						{formatPostcode(postcode)}
					</span>
				</P>
				<Button
					onClick={onChangePostcodeClick}
					testId={(testId ? testId + '-' : '') + 'change-postcode'}
					className={styles.changePostcode}
					aria-label={changePostcodeAriaLabel}
					appearance="secondary"
				>
					{changePostcodeButton}
				</Button>
			</Flex>
			<FFSelect
				ref={dropdownRef}
				label={selectAddressLabel}
				name="selectedAddress"
				options={options}
				id={(testId ? testId + '-' : '') + 'select-address-list'}
				testId={(testId ? testId + '-' : '') + 'select-address-list'}
				onChange={() => {
					// When the FFSelect has been fully rendered and has a value, update the validation object.
					// In this case it can only go from invalid (initial load) to valid (address selected).
					// You can't select an invalid option from the list because there aren't any, and if you don't select one this never runs.
					if (dropdownRef.current && dropdownRef.current.value) {
						updateAddressValidationIfChanged({ touched: true, error: '' });
					} else if (selectAddressValid.touched) {
						updateAddressValidationIfChanged({
							touched: true,
							error: selectAddressRequiredMessage,
						});
					}
				}}
				required={true}
				meta={selectAddressValid}
				notFoundMessage={noAddressesFoundMessage}
				placeholder={selectAddressPlaceholder}
				addPlaceholderOption={true}
				disabled={loading}
			/>
			<Button
				testId={(testId ? testId + '-' : '') + 'select-address-button'}
				appearance="secondary"
				onClick={handleOnClick}
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
