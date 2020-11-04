import React, { useEffect, useCallback } from 'react';
import { Flex, Button, P, Link } from '@tpr/core';
import { FFInputText, useFormState } from '@tpr/forms';
import { extractToObject, postcodeIsValid } from './helpers';
import { PostcodeProps } from '../../../common/interfaces';
import styles from './Postcode.module.scss';

const Postcode: React.FC<PostcodeProps> = ({
	lookup,
	loading,
	postcode,
	setPostcode,
	showLookup,
	setLoading,
	setOptions,
	setInitialValue,
	addressAPI,
	i18n,
}) => {
	const utils = useFormState();
	const search = useCallback(
		(postcode: string, country = 'GBR') => {
			setLoading(true);
			addressAPI
				.get(
					`search?country=${country}&query=${postcode}&take=${
						addressAPI.limit || 50
					}`,
				)
				.then((response: { data: any }) => {
					if (
						response &&
						Array.isArray(response.data.results) &&
						response.data.results.length > 0
					) {
						Promise.all(
							response.data.results.map(({ format }: { format: string }) => {
								const [url] = format.split('v2/').slice(-1);
								return addressAPI.get(url).then(({ data }) => {
									const addressObject = extractToObject(data.address);

									const addressToOurFormat = {
										addressLine1: addressObject.addressLine1 || '',
										addressLine2: addressObject.addressLine2 || '',
										addressLine3: addressObject.addressLine3 || '',
										postTown: addressObject.locality || '',
										postcode: addressObject.postalCode || '',
										county: addressObject.province || '',
										country: addressObject.country || '',
									};

									return {
										value: addressToOurFormat,
										label: Object.keys(addressToOurFormat)
											.filter((key) => addressToOurFormat[key])
											.map((key) => addressToOurFormat[key])
											.join(', '),
									};
								});
							}),
						).then((results) => {
							setOptions(results);
							setInitialValue(results ? results[0]:{})
							showLookup(false);
							setLoading(false);
						});
					} else {
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		},
		[setOptions, setInitialValue],
	);

	useEffect(() => {
		if (postcode) {
			search(postcode);
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<P cfg={{ mb: 3 }}>{i18n.address.auto.subtitle}</P>
			<P cfg={{ mb: 2, fontWeight: 3 }}>{i18n.address.postcode.title}</P>
			{lookup ? (
				<>
					<div className={styles.inputWrapper}>
						<FFInputText
							name="postcode"
							label=""
							disabled={loading}
							validate={(value) =>
								postcodeIsValid(value, i18n?.address.postcode.regExPattern)
									? undefined
									: i18n.address.auto.fields.postcode.invalidError
							}
							inputWidth={7}
						></FFInputText>
					</div>
					<Flex>
						<Button
							onClick={() => {
								if (
									postcodeIsValid(
										utils.values.postcode,
										i18n?.address.postcode.regExPattern,
									)
								) {
									setPostcode(utils.values.postcode);
									setInitialValue({});
									search(utils.values.postcode);
								}
							}}
							disabled={
								!postcodeIsValid(
									utils.values.postcode,
									i18n?.address.postcode.regExPattern,
								) || loading
							}
						>
							{loading ? 'Loading...' : i18n.address.postcode.button}
						</Button>
					</Flex>
				</>
			) : (
				<Flex>
					<P cfg={{ mr: 2 }}>{postcode}</P>
					<Link onClick={() => {
						debugger;
						showLookup(true)
					}} underline>
						{i18n.address.postcode.link}
					</Link>
				</Flex>
			)}
		</div>
	);
};

export default Postcode;
