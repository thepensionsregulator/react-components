import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';
import PostcodeValidator from './PostcodeValidator';

type PostcodeLookupProps = {
	testId?: string;
	postcode?: string;
	onPostcodeChanged: (postcode: string) => void;
};

const validator = new PostcodeValidator('Enter a valid postcode');

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({
	testId,
	onPostcodeChanged,
}) => {
	let postcodeValid = true;
	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
				<>
					<FFInputText
						name="postcode"
						label="Postcode"
						validate={(value) => {
							const result = validator.validatePostcode(value);
							postcodeValid = typeof result === 'undefined';
							return result;
						}}
						testId={testId + '-postcode-lookup'}
						inputWidth={1}
					/>
					<Button
						testId={testId + '-postcode-lookup-button'}
						onClick={() => {
							if (postcodeValid) {
								onPostcodeChanged(values.postcode);
							}
						}}
					>
						Find address
					</Button>
				</>
			)}
		</Form>
	);
};
