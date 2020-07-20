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
	const { send, i18n } = useTrusteeContext();

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
						label="Address"
						name="address"
						placeholder={i18n.address.auto.dropdown.placeholder}
						options={options}
						inputWidth={6}
						validate={(value) =>
							!value ? i18n.address.auto.dropdown.error : undefined
						}
						disabled={loading}
					/>
					<Link onClick={onClick} cfg={{ mt: 3 }}>
						{i18n.address.auto.dropdown.link}
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
