import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-final-form';
import { Button, Flex } from '@tpr/core';
import { FFInputText } from '../text/text';
import { postcodeValidator } from './services';
import { PostcodeLookupProps } from './types';
import styles from './addressLookup.module.scss';

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

	const searchFieldRef = useRef<HTMLInputElement>(null);
	const [postcodeValid, setPostcodeValid] = useState(false);

	const clickFindAddress = () => {
		postcodeValid &&
			onPostcodeChanged(form.getFieldState('postcodeLookup').value);
	};

	useEffect(() => {
		searchFieldRef.current.value = null;
		searchFieldRef.current.focus();
	}, []);

	const validatePostcode = (value) => {
		const result = postcodeValidator(value, invalidPostcodeMessage);
		typeof result === 'undefined'
			? setPostcodeValid(true)
			: setPostcodeValid(false);
		return result;
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			clickFindAddress();
		}
	};

	return (
		<>
			<FFInputText
				ref={searchFieldRef}
				name="postcodeLookup"
				autoComplete="postal-code"
				value={postcode}
				label={postcodeLookupLabel}
				required
				validate={(value) => searchFieldRef.current && validatePostcode(value)}
				testId={(testId ? testId + '-' : '') + 'postcode-lookup-edit'}
				inputClassName={styles.editPostcode}
				disabled={loading}
				onKeyPress={handleKeyPress}
			/>
			<Flex
				cfg={{
					flexDirection: 'row',
					mt: 2,
					alignItems: 'center',
				}}
			>
				<Button
					testId={(testId ? testId + '-' : '') + 'postcode-lookup-button'}
					onClick={clickFindAddress}
					appearance="secondary"
					aria-disabled={!postcodeValid}
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
