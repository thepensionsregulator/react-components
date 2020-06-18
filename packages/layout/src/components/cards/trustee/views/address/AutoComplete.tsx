import React from 'react';
import { Link, P } from '@tpr/core';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Form, FFSelect } from '@tpr/forms';
import { ArrowButton } from '../../../../buttons/buttons';

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
		}
	};

	return (
		<Form onSubmit={onSubmit}>
			{({ handleSubmit, submitError }) => (
				<form onSubmit={handleSubmit}>
					<FFSelect
						name="address"
						placeholder="Please select the address from the dropdown"
						options={options}
						inputWidth={6}
						validate={(value) =>
							!value
								? 'Please select one of the address from the dropdown menu. If you cannot find your address, please click the link below to enter it manually.'
								: undefined
						}
						disabled={loading}
					/>
					<Link onClick={onClick} cfg={{ mt: 3 }}>
						I can't find my address in the list
					</Link>
					{submitError && (
						<P cfg={{ color: 'danger.2', mt: 5 }}>{submitError}</P>
					)}
					<Footer>
						<ArrowButton
							intent="special"
							pointsTo="up"
							iconSide="right"
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
