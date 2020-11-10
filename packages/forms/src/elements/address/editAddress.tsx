import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { P, Button } from '@tpr/core';
import { Address } from './address';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';

type EditAddressProps = {
	initialValue?: Address;
	testId?: string;
	onChangeAddressClick: () => void;
	onAddressSaved: (savedAddress: Address) => void;
	addressLine1Label: string;
	addressLine2Label: string;
	addressLine3Label: string;
	townLabel: string;
	countyLabel: string;
	postcodeLabel: string;
	countryLabel: string;
	changeAddressButton: string;
	saveAddressButton: string;
};

export const EditAddress: React.FC<EditAddressProps> = ({
	initialValue,
	testId,
	onChangeAddressClick,
	onAddressSaved,
	addressLine1Label,
	addressLine2Label,
	addressLine3Label,
	townLabel,
	countyLabel,
	postcodeLabel,
	countryLabel,
	changeAddressButton,
	saveAddressButton,
}) => {
	initialValue = initialValue || {};
	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
				<>
					<FFInputText
						name="addressLine1"
						label={addressLine1Label}
						testId={(testId ? testId + '-' : '') + 'address-line-1'}
						initialValue={initialValue.addressLine1}
						inputWidth={6}
					/>
					<FFInputText
						name="addressLine2"
						label={addressLine2Label}
						testId={(testId ? testId + '-' : '') + 'address-line-2'}
						initialValue={initialValue.addressLine2}
						inputWidth={6}
					/>
					<P className={styles.nonEditable} cfg={{ mt: 3 }}>
						<strong
							id={(testId ? testId + '-' : '') + 'address-line-3'}
							className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
						>
							{addressLine3Label}
						</strong>{' '}
						<span
							aria-labelledby={(testId ? testId + '-' : '') + 'address-line-3'}
						>
							{initialValue.addressLine3}
						</span>
					</P>
					<P className={styles.nonEditable}>
						<strong
							id={(testId ? testId + '-' : '') + 'town'}
							className={`${`${elementStyles.labelText} ${styles.nonEditableLabel}`} ${
								styles.nonEditableLabel
							}`}
						>
							{townLabel}
						</strong>{' '}
						<span aria-labelledby={(testId ? testId + '-' : '') + 'town'}>
							{initialValue.postTown}
						</span>
					</P>
					<P className={styles.nonEditable}>
						<strong
							id={(testId ? testId + '-' : '') + 'county'}
							className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
						>
							{countyLabel}
						</strong>{' '}
						<span aria-labelledby={(testId ? testId + '-' : '') + 'county'}>
							{initialValue.county}
						</span>
					</P>
					<P className={styles.nonEditable}>
						<strong
							id={(testId ? testId + '-' : '') + 'postcode'}
							className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
						>
							{postcodeLabel}
						</strong>{' '}
						<span aria-labelledby={(testId ? testId + '-' : '') + 'postcode'}>
							{initialValue.postcode}
						</span>
					</P>
					<P className={styles.nonEditable}>
						<strong
							id={(testId ? testId + '-' : '') + 'country'}
							className={`${elementStyles.labelText} ${styles.nonEditableLabel}`}
						>
							{countryLabel}
						</strong>{' '}
						<span aria-labelledby={(testId ? testId + '-' : '') + 'country'}>
							{initialValue.country}
						</span>
					</P>

					<Button
						onClick={onChangeAddressClick}
						appearance="outlined"
						testId={(testId ? testId + '-' : '') + 'change-address'}
						className={styles.button}
					>
						{changeAddressButton}
					</Button>

					<Button
						testId={(testId ? testId + '-' : '') + 'save-address-button'}
						onClick={() => {
							onAddressSaved({
								...initialValue,
								addressLine1: values.addressLine1,
								addressLine2: values.addressLine2,
							});
						}}
						className={styles.button}
					>
						{saveAddressButton}
					</Button>
				</>
			)}
		</Form>
	);
};
