import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { Flex, Button, P, Link } from '@tpr/core';
import { Input } from '@tpr/forms';
import { extractToObject } from './helpers';
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
		(postcode: string, country = 'GBR', take = 100) => {
			setLoading(true);
			addressAPI
				.get(`search?country=${country}&query=${postcode}&take=${take}`)
				.then((resp) => {
					if (
						Array.isArray(resp.data.results) &&
						resp.data.results.length > 0
					) {
						Promise.all(
							resp.data.results.map(({ format }: { format: string }) => {
								const [url] = format.split('v2/').slice(-1);
								return addressAPI.get(url).then(({ data }) => {
									const address = extractToObject(data.address);

									const addressToOurFormat = {
										addressLine1: address.addressLine1 || '',
										addressLine2: address.addressLine2 || '',
										addressLine3: address.addressLine3 || '',
										city: address.locality || '',
										county: address.province || '',
										postcode: address.postalCode || '',
										country: address.country || '',
									};

									return {
										...addressToOurFormat,
										singleLineAddress: Object.keys(addressToOurFormat)
											.filter((key) => address[key])
											.map((key) => address[key])
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
