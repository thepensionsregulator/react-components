import React from 'react';
import { useInHouseAdminContext } from '../../context';
import { Content } from '../../../components/content';
import useSetState from '../../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from '../../../common/views/address/Postcode';
import { Flex, cardType, cardTypeName } from '@tpr/core';

export const AddressPage: React.FC = () => {
	const { current, i18n, addressAPI } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const [state, setState] = useSetState({
		loading: false,
		manual: false,
		postcode: inHouseAdmin.address.postcode,
		lookup: false,
		options: [],
	});
	const { loading, manual, postcode, lookup, options } = state;

	return (
		<Content
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.address.title}
		>
			<Postcode
				lookup={lookup}
				loading={loading}
				postcode={postcode}
				setPostcode={(postcode: string) => setState({ postcode })}
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
