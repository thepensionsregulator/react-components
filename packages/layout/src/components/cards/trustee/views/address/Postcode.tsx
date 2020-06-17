import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { Flex, Button, P, Link } from '@tpr/core';
import { Input } from '@tpr/forms';
import { extractToObject } from './helpers';
import { getObjectValueByString } from '../../../../../utils';
import { useTrusteeContext } from '../../context';
import styles from './Postcode.module.scss';

type PostcodeProps = {
	lookup: boolean;
	postcode: string;
	loading: boolean;
	setPostcode: Function;
	showLookup: Function;
	setLoading: Function;
	setOptions: Function;
};
const Postcode: React.FC<PostcodeProps> = ({
	lookup,
	loading,
	postcode,
	setPostcode,
	showLookup,
	setLoading,
	setOptions,
}) => {
	const { addressAPI } = useTrusteeContext();

	const search = useCallback(
		(postcode: string, country = 'GBR') => {
			setLoading(true);
			addressAPI
				.get(
					`search?country=${country}&query=${postcode}&take=${
						addressAPI.limit || 50
					}`,
				)
				.then((response: unknown) => {
					const results = getObjectValueByString(
						response,
						addressAPI.extract || 'results',
					);

					if (Array.isArray(results) && results.length > 0) {
						Promise.all(
							results.map(({ format }: { format: string }) => {
								const [url] = format.split('v2/').slice(-1);
								return addressAPI.get(url).then(({ address }) => {
									const addressObject = extractToObject(address);

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
											.filter((key) => addressObject[key])
											.map((key) => addressObject[key])
											.join(', '),
									};
								});
							}),
						).then((results) => {
							setOptions(results);
							showLookup(false);
							setLoading(false);
						});
					} else {
						setLoading(false);
						console.error('NOTHING WAS FOUND');
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		},
		[setOptions],
	);

	useEffect(() => {
		if (postcode) {
			search(postcode);
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<P cfg={{ mb: 3 }}>Find the trustee's correspondence address</P>
			<P cfg={{ mb: 2, fontWeight: 3 }}>Postcode</P>
			{lookup ? (
				<>
					<div className={styles.inputWrapper}>
						<Input
							type="text"
							value={postcode}
							onChange={(evt: ChangeEvent<HTMLInputElement>) =>
								setPostcode(evt.target.value)
							}
							disabled={loading}
						/>
					</div>
					<Flex>
						<Button
							onClick={() => {
								search(postcode);
								// form.change("address", undefined);
							}}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Find Address'}
						</Button>
					</Flex>
				</>
			) : (
				<Flex>
					<P cfg={{ mr: 2 }}>{postcode}</P>
					<Link onClick={() => showLookup(true)} underline>
						Change
					</Link>
				</Flex>
			)}
		</div>
	);
};

export default Postcode;
