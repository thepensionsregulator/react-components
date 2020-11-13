import React from 'react';
import { Field, useForm } from 'react-final-form';
import { Address } from './address';
import { FFInputText } from '../text/text';
import { HiddenInput } from '../hidden/hidden';
import { P, Link } from '@tpr/core';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';

type EditAddressProps = {
	initialValue?: Address;
	value?: Address;
	testId?: string;
	onChangeAddressClick: () => void;
	addressLine1Label: string;
	addressLine1RequiredMessage: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
	changeAddressAriaLabel?: string;
};

export const EditAddress: React.FC<EditAddressProps> = ({
	initialValue,
	value,
	testId,
	onChangeAddressClick,
	addressLine1Label,
	addressLine1RequiredMessage,
	addressLine2Label,
	addressLine3Label,
	townLabel,
	countyLabel,
	postcodeLabel,
	countryLabel,
	changeAddressButton,
	changeAddressAriaLabel,
}) => {
	const form = useForm();

	function isDirty() {
		const selectedAddress = form.getFieldState('selectedAddress');
		return selectedAddress && selectedAddress.dirty;
	}

	function renderNonEditableFieldWithUpdates(
		fieldName: string,
		label?: string,
	) {
		return (
			<>
				{label && (
					<P className={styles.nonEditable}>
						<strong
							id={(testId ? testId + '-' : '') + fieldName}
							className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
						>
							{label}
						</strong>{' '}
						<span aria-labelledby={(testId ? testId + '-' : '') + fieldName}>
							{value ? value[fieldName] : initialValue[fieldName]}
						</span>
					</P>
				)}
				<Field
					name={fieldName}
					type="hidden"
					data-testid={(testId ? testId + '-' : '') + fieldName + '-hidden'}
					initialValue={isDirty() ? value[fieldName] : initialValue[fieldName]}
					updatedValue={value ? value[fieldName] : ''}
					render={(props) => <HiddenInput type="hidden" {...props} />}
				/>
			</>
		);
	}

	function renderInitialValueField(fieldName: string) {
		return (
			<Field
				name={fieldName + 'InitialValue'}
				data-testid={
					(testId ? testId + '-' : '') + fieldName + 'InitialValue-hidden'
				}
				initialValue={initialValue[fieldName]}
				render={(props) => <HiddenInput type="hidden" {...props} />}
			/>
		);
	}

	initialValue = initialValue || {};
	return (
		<>
			<FFInputText
				name="addressLine1"
				label={addressLine1Label}
				testId={(testId ? testId + '-' : '') + 'addressLine1'}
				initialValue={
					isDirty() ? value.addressLine1 : initialValue.addressLine1
				}
				updatedValue={value ? value.addressLine1 : ''}
				validate={(value) =>
					value && value.trim().length > 1
						? undefined
						: addressLine1RequiredMessage
				}
				inputWidth={6}
			/>
			<FFInputText
				name="addressLine2"
				label={addressLine2Label}
				testId={(testId ? testId + '-' : '') + 'addressLine2'}
				initialValue={
					isDirty() ? value.addressLine2 : initialValue.addressLine2
				}
				updatedValue={value ? value.addressLine2 : ''}
				inputWidth={6}
			/>
			{renderNonEditableFieldWithUpdates('addressLine3', addressLine3Label)}
			{renderNonEditableFieldWithUpdates('postTown', townLabel)}
			{renderNonEditableFieldWithUpdates('county', countyLabel)}
			{renderNonEditableFieldWithUpdates('postcode', postcodeLabel)}
			{renderNonEditableFieldWithUpdates('nationId')}
			{renderNonEditableFieldWithUpdates('country', countryLabel)}
			{renderNonEditableFieldWithUpdates('countryId')}
			{renderNonEditableFieldWithUpdates('uprn')}

			{renderInitialValueField('addressLine1')}
			{renderInitialValueField('addressLine2')}
			{renderInitialValueField('addressLine3')}
			{renderInitialValueField('postTown')}
			{renderInitialValueField('county')}
			{renderInitialValueField('postcode')}
			{renderInitialValueField('nationId')}
			{renderInitialValueField('country')}
			{renderInitialValueField('countryId')}
			{renderInitialValueField('uprn')}

			<Link
				onClick={onChangeAddressClick}
				testId={(testId ? testId + '-' : '') + 'change-address'}
				className={styles.button}
				aria-label={changeAddressAriaLabel}
			>
				{changeAddressButton}
			</Link>
		</>
	);
};
