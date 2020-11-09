import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';
import PostcodeValidator from './PostcodeValidator';

type PostcodeLookupProps = {
	testId?: string;
	postcode?: string;
	onPostcodeChanged: (postcode: string) => void;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
};

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({
	testId,
	onPostcodeChanged,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
}) => {
	const validator = new PostcodeValidator(invalidPostcodeMessage);
	let postcodeValid = true;
	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
				<>
					<FFInputText
						name="postcode"
						label={postcodeLookupLabel}
						validate={(value) => {
							const result = validator.validatePostcode(value);
							postcodeValid = typeof result === 'undefined';
							return result;
						}}
						testId={(testId ? testId + '-' : '') + 'postcode-lookup-edit'}
						inputWidth={1}
					/>
					<Button
						testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
						onClick={() => {
							if (postcodeValid) {
								onPostcodeChanged(values.postcode);
							}
						}}
					>
						{postcodeLookupButton}{' '}
					</Button>
				</>
			)}
		</Form>
	);
};
