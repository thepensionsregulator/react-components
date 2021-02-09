import React, { useState, useRef } from 'react';
import { useForm } from 'react-final-form';
import PostcodeValidator from './postcodeValidator';
import { FFInputText } from '../text/text';
import { Button, Flex, Link } from '@tpr/core';
import styles from './addressLookup.module.scss';

type PostcodeLookupProps = {
	loading: boolean;
	testId?: string;
	postcode?: string;
	onPostcodeChanged: (postcode: string) => void;
	invalidPostcodeMessage: string;
	postcodeLookupLabel: string;
	postcodeLookupButton: string;
	findAddressCancelledButton?: string;
	onFindAddressCancelled?: () => void;
	onValidatePostcode?:(isValid:boolean)=>void | null;
};

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
	onValidatePostcode,
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

	const validatePostcode = (value) => {
		const result = validator.validatePostcode(value);
	 let isValid:boolean;

		if(typeof result === 'undefined'){
			setPostcodeValid(true);
			isValid=true;
		}else{
			setPostcodeValid(false);
			isValid=false;
		}

		if(onValidatePostcode !== null){
			onValidatePostcode(isValid);
		}

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
			<Flex cfg={{ flexDirection: 'row', mt: 2 }}>
				<Button
					testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
					onClick={clickFindAddress}
					disabled={loading || !postcodeValid}
				>
					{postcodeLookupButton}
				</Button>
				{onFindAddressCancelled && (
					<Link
						cfg={{ m: 3 }}
						underline
						onClick={onFindAddressCancelled}
						testId={(testId ? testId + '-' : '') + 'find-address-cancel-button'}
					>
						{findAddressCancelledButton}
					</Link>
				)}
			</Flex>
		</>
	);
};
