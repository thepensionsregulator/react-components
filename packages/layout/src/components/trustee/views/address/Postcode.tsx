import React, { useEffect, useCallback } from 'react';
import { Flex, Button, H4, P, Link } from '@tpr/core';
import { extractToObject } from './helpers';
import { useTrusteeContext } from '../../context';

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
		<Flex cfg={{ flexDirection: 'column', bg: 'neutral.1', p: 2, mb: 3 }}>
			<H4 cfg={{ mb: 1 }}>Find the trustee's correspondence address</H4>
			<P cfg={{ mb: 1, fontWeight: 3 }}>Postcode</P>
			{lookup ? (
				<>
					<Flex
						cfg={{ mb: 1 }}
						//  width="160px"
					>
						INPUT HERE
						{/* <StyledInput
							value={postcode}
							onChange={(evt) => setPostcode(evt.target.value)}
							disabled={loading}
						/> */}
					</Flex>
					<Button
						width="160px"
						onClick={() => {
							search(postcode);
							// form.change("address", undefined);
						}}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Find Address'}
					</Button>
				</>
			) : (
				<Flex>
					<P cfg={{ mr: 2 }}>{postcode}</P>
					<Link appearance="primary" onClick={() => showLookup(true)}>
						Change
					</Link>
				</Flex>
			)}
		</Flex>
	);
};

export default Postcode;
