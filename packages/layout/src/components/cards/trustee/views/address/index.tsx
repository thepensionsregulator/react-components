import React from 'react';
import { Flex } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Content } from '../../../components/content';
import useSetState from '../../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from '../../../common/views/address/Postcode';
import { cardType } from '../../../common/interfaces';

const AddressPage: React.FC = () => {
	const { current, i18n, addressAPI } = useTrusteeContext();
	const { trustee } = current.context;
	const [state, setState] = useSetState({
		loading: false,
		manual: false,
		postCode: trustee.address.postCode,
		lookup: false,
		options: [],
	});
	const { loading, manual, postCode, lookup, options } = state;

	return (
		<Content type={cardType.trustee} title={i18n.address.title}>
			<Postcode
				lookup={lookup}
				loading={loading}
				postCode={postCode}
				setPostcode={(postCode: string) => setState({ postCode })}
				showLookup={(lookup: boolean) => setState({ lookup })}
				setLoading={(loading: boolean) => setState({ loading })}
				setOptions={(options: any[]) => setState({ options })}
				addressAPI={addressAPI}
				i18n={i18n}
			/>
			<Flex cfg={{ flexDirection: 'column' }}>
				{manual ? (
					<ManualComplete />
				) : (
					<AutoComplete
						loading={loading}
						options={options}
						onClick={() => setState({ manual: true })}
					/>
				)}
			</Flex>
		</Content>
	);
};

export default AddressPage;
