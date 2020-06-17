import React from 'react';
import { Link } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Footer, FooterButton } from '../../../components/card';
import { Form, FFSelect } from '@tpr/forms';

type AutoCompleteProps = {
	onClick: (evt: any) => void;
	options: any[];
	loading: boolean;
};
const AutoComplete: React.FC<AutoCompleteProps> = ({
	onClick,
	options,
	loading,
}) => {
	const { send } = useTrusteeContext();

	const onSubmit = (values) => {
		if (Object.values(values).length > 0) {
			send('SAVE', { address: values.address.value });
		} else {
			Promise.reject('Address has not been selected...');
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			{({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<FFSelect
						name="address"
						placeholder="Please select the address from the dropdown"
						options={options}
						inputWidth={6}
						disabled={loading}
					/>
					<Link onClick={onClick} cfg={{ mt: 3 }}>
						I can't find my address in the list
					</Link>
					<Footer>
						<FooterButton
							type="submit"
							title="Save and close"
							disabled={loading}
						/>
					</Footer>
				</form>
			)}
		</Form>
	);
};

export default AutoComplete;
