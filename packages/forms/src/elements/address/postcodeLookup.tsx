import React from 'react';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';

type PostcodeLookupProps = {
	testId?: string;
	onSubmit: () => void;
};

const postcodeIsValid = (postcode: string): boolean => true;

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({
	testId,
	onSubmit,
}) => {
	return (
		<>
			<FFInputText
				name="postcode"
				label="Postcode"
				validate={(value) =>
					postcodeIsValid(value) ? undefined : 'invalid postcode'
				}
				testId={testId + '-postcode-lookup'}
				inputWidth={1}
			/>
			<Button testId={testId + '-postcode-lookup-button'} onClick={onSubmit}>
				Next
			</Button>
		</>
	);
};
