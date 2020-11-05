import React from 'react';
import { FFInputText } from '../text/text';
import { FFSelect } from '../select/select';
import { Button } from '@tpr/core';

type SelectAddressProps = {
	testId?: string;
	postcode?: string;
	onSubmit: () => void;
};

export const SelectAddress: React.FC<SelectAddressProps> = ({
	testId,
	postcode,
	onSubmit,
}) => {
	return (
		<>
			<FFInputText
				name="postcode"
				label="Postcode"
				testId={testId + '-selected-postcode'}
				initialValue={postcode}
				readOnly={true}
				inputWidth={1}
			/>
			<FFSelect
				label="Select an address"
				name="address"
				options={[]}
				inputWidth={6}
			/>
			<Button testId={testId + '-select-address-button'} onClick={onSubmit}>
				Next
			</Button>
		</>
	);
};
