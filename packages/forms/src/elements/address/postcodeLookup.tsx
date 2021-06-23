import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-final-form';
import PostcodeValidator from './postcodeValidator';
import { FFInputText } from '../text/text';
import { Button, Flex } from '@tpr/core';
import styles from './addressLookup.module.scss';
import { PostcodeLookupProps } from './types/PostcodeLookupProps';

export const PostcodeLookup: React.FC<PostcodeLookupProps> = ({
	loading,
	testId,
	postcode,
	onPostcodeChanged,
	invalidPostcodeMessage,
	postcodeLookupLabel,
	postcodeLookupButton,
	findAddressCancelledButton,
	onFindAddressCancelled,
}) => {
	const form = useForm();
	const validator = new PostcodeValidator(invalidPostcodeMessage);

	const searchFieldRef = useRef(null);
	const [postcodeValid, setPostcodeValid] = useState(false);

	const clickFindAddress = () => {
		// the blur event will trigger 'validate' in FFInputText when clicking 'Find address' without having visited the input field.
		const myEvent = new Event('blur', { bubbles: true });
		searchFieldRef.current.dispatchEvent(myEvent);
		postcodeValid &&
			onPostcodeChanged(form.getFieldState('postcodeLookup').value);
	};

	useEffect(() => {
		searchFieldRef.current.value = null;
	});

	const validatePostcode = (value) => {
		const result = validator.validatePostcode(value);
		typeof result === 'undefined'
			? setPostcodeValid(true)
			: setPostcodeValid(false);
		return result;
	};

	return (
		<>
			<FFInputText
				ref={searchFieldRef}
				name="postcodeLookup"
				value={postcode}
				label={postcodeLookupLabel}
				validate={(value) => validatePostcode(value)}
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-edit'}
				inputClassName={styles.editPostcode}
				disabled={loading}
				defaultValue={''}
			/>
			<Flex cfg={{ flexDirection: 'row', mt: 2, alignItems: 'center' }}>
				<Button
					testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
					onClick={clickFindAddress}
					appearance="secondary"
					disabled={loading || !postcodeValid}
				>
					{postcodeLookupButton}
				</Button>
				{onFindAddressCancelled && (
					<Button
						cfg={{ ml: 3 }}
						onClick={onFindAddressCancelled}
						testId={(testId ? testId + '-' : '') + 'find-address-cancel-button'}
						appearance="secondary"
					>
						{findAddressCancelledButton}
					</Button>
				)}
			</Flex>
		</>
	);
};
