import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { P, Link, Button, Flex } from '@tpr/core';
import { Address } from './address';
import { ArrowRight } from '@tpr/icons';
import elementStyles from '../elements.module.scss';
import styles from './addressLookup.module.scss';

type EditAddressProps = {
	initialValue?: Address;
	value?: Address;
	testId?: string;
	onChangeAddressClick: () => void;
	onAddressSaved: (savedAddress: Address) => void;
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
	saveAddressButton: string;
};

export const EditAddress: React.FC<EditAddressProps> = ({
	initialValue,
	value,
	testId,
	onChangeAddressClick,
	onAddressSaved,
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
						initialValue={
							value ? value.addressLine1 : initialValue.addressLine1
						}
						validate={(value) =>
							value ? undefined : addressLine1RequiredMessage
						}
						inputWidth={6}
					/>
					<FFInputText
						name="addressLine2"
						label={addressLine2Label}
						testId={(testId ? testId + '-' : '') + 'address-line-2'}
						initialValue={
							value ? value.addressLine2 : initialValue.addressLine2
						}
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
							{value ? value.addressLine3 : initialValue.addressLine3}
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
							{value ? value.postTown : initialValue.postTown}
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
							{value ? value.county : initialValue.county}
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
							{value ? value.postcode : initialValue.postcode}
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
							{value ? value.country : initialValue.country}
						</span>
					</P>

					<Link
						onClick={onChangeAddressClick}
						testId={(testId ? testId + '-' : '') + 'change-address'}
						className={styles.button}
						aria-label={changeAddressAriaLabel}
					>
						{changeAddressButton}
					</Link>

					<Button
						testId={(testId ? testId + '-' : '') + 'save-address-button'}
						onClick={() => {
							if (
								values.addressLine1 !== initialValue.addressLine1 ||
								values.addressLine2 !== initialValue.addressLine2
							) {
								onAddressSaved({
									...initialValue,
									addressLine1: values.addressLine1,
									addressLine2: values.addressLine2,
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
							{saveAddressButton}
							<ArrowRight cfg={{ fill: 'white' }} width={'32'} />
						</Flex>
					</Button>
				</>
			)}
		</Form>
	);
};
