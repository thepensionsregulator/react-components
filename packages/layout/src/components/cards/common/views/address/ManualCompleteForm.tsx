import React from 'react';
import { Flex, P } from '@tpr/core';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Loading } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardTypeName } from '../../interfaces';

interface ManualCompleteFormProps {
	loading: boolean;
	title: string;
	onSubmit: (any) => void;
	fields: FieldProps[];
	initialValues: {
		postcode: string;
	};
	cardTypeName: cardTypeName;
}

const ManualCompleteForm: React.FC<ManualCompleteFormProps> = ({
	loading,
	title,
	onSubmit,
	fields,
	initialValues,
	cardTypeName,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column' }}>
			{loading && <Loading />}
			<P cfg={{ fontWeight: 3 }}>{title}</P>
			<P cfg={{ my: 3 }}>
				Enter the {cardTypeName}’s correspondence address manually.
			</P>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={initialValues}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(fields)}
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
		</Flex>
	);
};

export default React.memo(ManualCompleteForm);
