import React from 'react';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';
import { Address } from './address';

type EditAddressProps = {
	address?: Address;
	testId?: string;
	onSubmit: () => void;
};

export const EditAddress: React.FC<EditAddressProps> = ({
	address,
	testId,
	onSubmit,
}) => {
	return (
		<>
			<FFInputText
				name="addressLine1"
				label="Address line 1"
				testId={testId + '-address-line-1'}
				initialValue={address && address.addressLine1}
				inputWidth={6}
			/>
			<FFInputText
				name="addressLine2"
				label="Address line 2"
				testId={testId + '-address-line-2'}
				initialValue={address && address.addressLine2}
				inputWidth={6}
			/>
			<FFInputText
				name="addressLine3"
				label="Address line 3"
				testId={testId + '-address-line-3'}
				initialValue={address && address.addressLine3}
				readOnly={true}
				inputWidth={6}
			/>
			<FFInputText
				name="town"
				label="Post town"
				testId={testId + '-town'}
				initialValue={address && address.postTown}
				readOnly={true}
				inputWidth={6}
			/>
			<FFInputText
				name="county"
				label="County"
				testId={testId + '-county'}
				initialValue={address && address.county}
				readOnly={true}
				inputWidth={6}
			/>
			<FFInputText
				name="postcode"
				label="Postcode"
				testId={testId + '-postcode'}
				initialValue={address && address.postcode}
				readOnly={true}
				inputWidth={1}
			/>
			<FFInputText
				name="country"
				label="Country"
				testId={testId + '-country'}
				initialValue={address && address.country}
				readOnly={true}
				inputWidth={6}
			/>
			<Button testId={testId + '-edit-address-button'} onClick={onSubmit}>
				Next
			</Button>
		</>
	);
};
