import React from 'react';
import { Link, P } from '@tpr/core';
import { Footer } from '../../../components/card';
import { Form, FFSelect } from '@tpr/forms';
import { ArrowButton } from '../../../../buttons/buttons';
import { AutoCompleteProps } from '../../interfaces';

interface AutoCompleteFormProps extends AutoCompleteProps {
	onSubmit: any;
	dropdown: any;
	submitLoading?: any;
}

const AutoCompleteForm: React.FC<AutoCompleteFormProps> = ({
	onClick,
	options,
	loading,
	onSubmit,
	dropdown,
	submitLoading,
}) => {
	return (
		<Form onSubmit={onSubmit}>
			{({ handleSubmit, submitError }) => (
				<form onSubmit={handleSubmit}>
					<FFSelect
						label="Address"
						name="address"
						placeholder={dropdown.placeholder}
						options={options}
						inputWidth={6}
						validate={(value) => (!value ? dropdown.error : undefined)}
						disabled={loading || submitLoading}
					/>
					<Link onClick={onClick} cfg={{ mt: 3 }}>
						{dropdown.link}
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
							disabled={loading || submitLoading}
						/>
					</Footer>
				</form>
			)}
		</Form>
	);
};

export default React.memo(AutoCompleteForm);
