import React, { useState } from 'react';
import { Flex } from '../../../layout';
import { H4 } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Toolbar } from '../../components/card';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from './Postcode';

const AddressPage: React.FC = () => {
	const { current } = useTrusteeContext();
	const { postCode } = current.context;
	const [manual, setManual] = useState(false);
	const [postcode, setPostcode] = useState(postCode);
	const [lookup, showLookup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [options, setOptions] = useState<{ [key: string]: string }[]>([]);

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
