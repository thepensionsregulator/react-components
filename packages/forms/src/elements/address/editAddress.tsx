import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { P, Button } from '@tpr/core';
import { Address } from './address';

type EditAddressProps = {
	initialValue?: Address;
	testId?: string;
	onChangeAddressClick: () => void;
	onAddressSaved: (savedAddress: Address) => void;
};

export const EditAddress: React.FC<EditAddressProps> = ({
	initialValue,
	testId,
	onChangeAddressClick,
	onAddressSaved,
}) => {
	initialValue = initialValue || {};
	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
				<>
					<FFInputText
						name="addressLine1"
						label="Address line 1"
						testId={testId + '-address-line-1'}
						initialValue={initialValue.addressLine1}
						inputWidth={6}
					/>
					<FFInputText
						name="addressLine2"
						label="Address line 2"
						testId={testId + '-address-line-2'}
						initialValue={initialValue.addressLine2}
						inputWidth={6}
					/>
					<P>
						<strong id={testId + '-address-line-3'}>Address line 3</strong>{' '}
						<span aria-labelledby={testId + '-address-line-3'}>
							{initialValue.addressLine3}
						</span>
					</P>
					<P>
						<strong id={testId + '-town'}>Post town</strong>{' '}
						<span aria-labelledby={testId + '-town'}>
							{initialValue.postTown}
						</span>
					</P>
					<P>
						<strong id={testId + '-county'}>County</strong>{' '}
						<span aria-labelledby={testId + '-county'}>
							{initialValue.county}
						</span>
					</P>
					<P>
						<strong id={testId + '-postcode'}>Postcode</strong>{' '}
						<span aria-labelledby={testId + '-postcode'}>
							{initialValue.postcode}
						</span>
					</P>
					<P>
						<strong id={testId + '-country'}>Country</strong>{' '}
						<span aria-labelledby={testId + '-country'}>
							{initialValue.country}
						</span>
					</P>

					<Button
						onClick={onChangeAddressClick}
						appearance="outlined"
						testId={testId + '-change-address'}
					>
						I need to change the address
					</Button>

					<Button
						testId={testId + '-edit-address-button'}
						onClick={() => {
							onAddressSaved({
								...initialValue,
								addressLine1: values.addressLine1,
								addressLine2: values.addressLine2,
							});
						}}
					>
						Continue
					</Button>
				</>
			)}
		</Form>
	);
};
