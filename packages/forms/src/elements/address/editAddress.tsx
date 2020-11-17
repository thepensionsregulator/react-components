import React, { useEffect, useRef } from 'react';
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
	loading: boolean;
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

export const EditAddress: React.FC<EditAddressProps> = React.memo(
	({
		initialValue,
		value,
		loading,
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

		const blurEvent = new Event('blur', { bubbles: true });

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
						initialValue={
							isDirty() ? value[fieldName] : initialValue[fieldName]
						}
						updatedValue={value ? value[fieldName] : ''}
						render={(props) => <HiddenInput type="hidden" {...props} />}
					/>
				</>
			);
		}

		function renderInitialValueField(fieldName: string, value: string) {
			return (
				<Field
					name={fieldName + 'InitialValue'}
					data-testid={
						(testId ? testId + '-' : '') + fieldName + 'InitialValue-hidden'
					}
					initialValue={value}
					render={(props) => <HiddenInput type="hidden" {...props} />}
				/>
			);
		}

		const address1ref = useRef(null);
		const address2ref = useRef(null);

		useEffect(() => {
			// in some cases when 'value'=='initialValue',
			// the input fields do not refresh the view and keep the previous values,
			// dispatching a 'blur' event will refresh the view with the correct values.
			address1ref.current.dispatchEvent(blurEvent);
			address2ref.current.dispatchEvent(blurEvent);
		}, [value]);

		return (
			<>
				<FFInputText
					ref={address1ref}
					name="addressLine1"
					label={addressLine1Label}
					disabled={loading}
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
					ref={address2ref}
					name="addressLine2"
					label={addressLine2Label}
					disabled={loading}
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

				{initialValue &&
					renderInitialValueField('addressLine1', initialValue.addressLine1)}
				{initialValue &&
					renderInitialValueField('addressLine2', initialValue.addressLine2)}
				{initialValue &&
					renderInitialValueField('addressLine3', initialValue.addressLine3)}
				{initialValue &&
					renderInitialValueField('postTown', initialValue.postTown)}
				{initialValue && renderInitialValueField('county', initialValue.county)}
				{initialValue &&
					renderInitialValueField('postcode', initialValue.postcode)}
				{initialValue &&
					renderInitialValueField(
						'nationId',
						initialValue.nationId && initialValue.nationId.toString(),
					)}
				{initialValue &&
					renderInitialValueField('country', initialValue.country)}
				{initialValue &&
					renderInitialValueField(
						'countryId',
						initialValue.countryId && initialValue.countryId.toString(),
					)}
				{initialValue &&
					renderInitialValueField(
						'uprn',
						initialValue.uprn && initialValue.uprn.toString(),
					)}

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
	},
);
