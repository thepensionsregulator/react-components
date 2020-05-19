import React from 'react';
import { Flex, H4 } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Content } from '../../components/content';
import useLoading from '../../hooks/use-loading';
import useSetState from '../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from './Postcode';

const AddressPage: React.FC = () => {
	const { current } = useTrusteeContext();
	const { trustee } = current.context;
	const [loading, setLoading] = useLoading();
	const [manual, setManual] = useSetState(false);
	const [postcode, setPostcode] = useSetState(trustee.address.postcode);
	const [lookup, showLookup] = useSetState(false);
	const [options, setOptions] = useSetState([]);

	return (
		<Content title="What is this trustee’s address?">
			<Postcode
				lookup={lookup}
				loading={loading}
				postcode={postcode}
				setPostcode={setPostcode}
				showLookup={showLookup}
				setLoading={setLoading}
				setOptions={setOptions}
			/>
			<Flex
				cfg={{ flexDirection: 'column' }}
				// maxWidth="760px"
			>
				<H4 cfg={{ fontWeight: 3, mb: 1 }}>Address</H4>
				{manual ? (
					<ManualComplete />
				) : (
					<AutoComplete options={options} onClick={() => setManual(true)} />
				)}
			</Flex>
		</Content>
	);
};

export default AddressPage;
