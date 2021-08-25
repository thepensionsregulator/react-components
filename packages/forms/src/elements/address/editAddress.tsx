import React, { useEffect, useRef } from 'react';
import { Field, useForm } from 'react-final-form';
import { FFInputText } from '../text/text';
import { HiddenInput } from '../hidden/hidden';
import { Button } from '@tpr/core';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';
import { EditAddressProps } from './types';

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
		headingLevel = 2,
	}) => {
		const form = useForm();

		function isDirty() {
			const selectedAddress = form.getFieldState('selectedAddress');
			return selectedAddress && selectedAddress.dirty;
		}

		function renderNonEditableFieldWithUpdates(
			fieldName: string,
			label?: string,
			headingLevel?: number,
		) {
			const ElementName = `h${headingLevel}` as keyof JSX.IntrinsicElements;
			return (
				<>
					{label && (
						<>
							<ElementName
								id={(testId ? testId + '-' : '') + fieldName}
								className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
							>
								{label}
							</ElementName>
							<p className={styles.nonEditableText}>
								{value ? value[fieldName] : initialValue[fieldName]}
							</p>
						</>
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
					name={'initialValue.' + fieldName}
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
			address1ref.current && address1ref.current.focus();
		}, [address1ref]);
	
		useEffect(() => {
			const blurEvent = new Event('blur', { bubbles: true });
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
					autoComplete="address-line1"
					label={addressLine1Label}
					disabled={loading}
					required
					id={(testId ? testId + '-' : '') + 'addressLine1'}
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
					maxLength={100}
					wrapperElement="div"
					labelElement="label"
					headingElement={`h${headingLevel}`}
				/>
				<FFInputText
					ref={address2ref}
					name="addressLine2"
					autoComplete="address-line2"
					label={addressLine2Label}
					disabled={loading}
					id={(testId ? testId + '-' : '') + 'addressLine2'}
					testId={(testId ? testId + '-' : '') + 'addressLine2'}
					initialValue={
						isDirty() ? value.addressLine2 : initialValue.addressLine2
					}
					updatedValue={value ? value.addressLine2 : ''}
					inputWidth={6}
					maxLength={100}
					wrapperElement="div"
					labelElement="label"
					headingElement={`h${headingLevel}`}
				/>
				{renderNonEditableFieldWithUpdates(
					'addressLine3',
					addressLine3Label,
					headingLevel,
				)}
				{renderNonEditableFieldWithUpdates('postTown', townLabel, headingLevel)}
				{renderNonEditableFieldWithUpdates('county', countyLabel, headingLevel)}
				{renderNonEditableFieldWithUpdates(
					'postcode',
					postcodeLabel,
					headingLevel,
				)}
				{renderNonEditableFieldWithUpdates('nationId')}
				{renderNonEditableFieldWithUpdates(
					'country',
					countryLabel,
					headingLevel,
				)}
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

				<Button
					onClick={onChangeAddressClick}
					testId={(testId ? testId + '-' : '') + 'change-address'}
					appearance="secondary"
					size="small"
					className={styles.button + ' ' + styles.changeAddress}
				>
					{changeAddressButton}
				</Button>
			</>
		);
	},
);
