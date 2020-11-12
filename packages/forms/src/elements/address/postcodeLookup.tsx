import React from 'react';
import { useForm } from 'react-final-form';
import PostcodeValidator from './postcodeValidator';
import { FFInputText } from '../text/text';
import { Button } from '@tpr/core';
import styles from './addressLookup.module.scss';

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
	postcode,
	onPostcodeChanged,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
}) => {
	const form = useForm();
	const validator = new PostcodeValidator(invalidPostcodeMessage);
	let postcodeValid = false;

	return (
		<>
			<FFInputText
				name="postcodeLookup"
				value={postcode}
				label={postcodeLookupLabel}
				validate={(value) => {
					console.log(value);
					const result = validator.validatePostcode(value);
					postcodeValid = typeof result === 'undefined';
					return result;
				}}
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-edit'}
				inputWidth={1}
			/>
			<Button
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
				onClick={(e) => {
					if (postcodeValid) {
						onPostcodeChanged(form.getFieldState('postcodeLookup').value);
					}
				}}
				className={styles.button}
			>
				{postcodeLookupButton}
			</Button>
		</>
	);
};
