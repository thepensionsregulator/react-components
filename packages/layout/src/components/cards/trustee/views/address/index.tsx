import React from 'react';
import { Flex } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Content } from '../../../components/content';
import useSetState from '../../../hooks/use-set-state';
import AutoComplete from './AutoComplete';
import ManualComplete from './ManualComplete';
import Postcode from '../../../common/views/address/Postcode';
import { cardType } from '../../../common/interfaces';
import { Form } from '@tpr/forms';

const AddressPage: React.FC = () => {
	const { current, i18n, addressAPI } = useTrusteeContext();
	const { trustee } = current.context;
	const [state, setState] = useSetState({
		loading: false,
		manual: false,
		postcode: trustee.address.postcode,
		lookup: false,
		options: [],
		initialValue:{}
	});
	const { loading, manual, postcode, lookup, options,initialValue } = state;

	return (
		<Content type={cardType.trustee} title={i18n.address.title}>
			<Form
				onSubmit={() => {}}
				initialValues={{
					postcode: postcode,
				}}
			>
				{({}) => (
					<form>
						<Postcode
							lookup={lookup}
							loading={loading}
							postcode={postcode}
							setPostcode={(postcode: string) => {
								console.log('poscode got set');
								console.log(postcode);
								setState({ postcode });
							}}
							showLookup={(lookup: boolean) => setState({ lookup })}
							setLoading={(loading: boolean) => setState({ loading })}
							setOptions={(options: any[]) => setState({ options })}
							setInitialValue={(initialValue:any)=>setState({initialValue})}
							addressAPI={addressAPI}
							i18n={i18n}
						/>
					</form>
				)}
			</Form>
			<Flex cfg={{ flexDirection: 'column' }}>
				{manual ? (
					<ManualComplete />
				) : (
					<AutoComplete
						loading={loading}
						options={options}
						initialValue ={initialValue}
						onClick={() => setState({ manual: true })}
					/>
				)}
			</Flex>
		</Content>
	);
};

export default AddressPage;
