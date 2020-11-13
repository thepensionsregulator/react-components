import React, { useState, useRef } from 'react';
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

	const searchFieldRef = useRef(null);
	const [postcodeValid, setPostcodeValid] = useState(false);

	const clickFindAddress = () => {
		// the blur event will trigger 'validate' in FFInputText when clicking 'Find address' without having visited the input field.
		const myEvent = new Event('blur', { bubbles: true });
		searchFieldRef.current.dispatchEvent(myEvent);

		postcodeValid && onPostcodeChanged(form.getFieldState('postcodeLookup').value);
	}

	const validatePostcode = (value) => {
		const result = validator.validatePostcode(value);
		typeof result === 'undefined' ? setPostcodeValid(true) : setPostcodeValid(false);
		return result;
	}

	return (
		<>
			<FFInputText
				ref={searchFieldRef}
				name="postcodeLookup"
				value={postcode}
				label={postcodeLookupLabel}
				validate={(value) => validatePostcode(value)}
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-edit'}
				inputWidth={1}
				defaultValue={''}
			/>
			<Button
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
				onClick={clickFindAddress}
				className={styles.button}
			>
				{postcodeLookupButton}
			</Button>
		</>
	);
};
