import React from 'react';
import { Form } from 'react-final-form';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';

type PostcodeLookupProps = {
	testId?: string;
	postcode?: string;
	onPostcodeChanged: (postcode: string) => void;
};

const postcodeIsValid = (postcode: string): boolean => true;

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({
	testId,
	onPostcodeChanged,
}) => {
	return (
		<Form onSubmit={() => {}}>
			{({ values }) => (
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
					<Button
						testId={testId + '-postcode-lookup-button'}
						onClick={() => {
							onPostcodeChanged(values.postcode);
						}}
					>
						Find address
					</Button>
				</>
			)}
		</Form>
	);
};
