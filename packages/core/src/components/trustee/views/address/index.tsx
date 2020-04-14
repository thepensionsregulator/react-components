import React from 'react';
import { Flex } from '../../../layout';
import { H4 } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Toolbar } from '../../components/card';
import useLoading from '../../../../hooks/use-loading';
import useSetState from '../../../../hooks/use-set-state';
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
		<Flex flex="1 1 auto" flexDirection="column">
			<Flex flexDirection="column">
				<Toolbar title="What is this trustee’s address?" />
				<Postcode
					lookup={lookup}
					loading={loading}
					postcode={postcode}
					setPostcode={setPostcode}
					showLookup={showLookup}
					setLoading={setLoading}
					setOptions={setOptions}
				/>
				<Flex flexDirection="column" maxWidth="760px">
					<H4 fontWeight="bold" mb={0}>
						Address
					</H4>
					{manual ? (
						<ManualComplete />
					) : (
						<AutoComplete options={options} onClick={() => setManual(true)} />
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default AddressPage;
