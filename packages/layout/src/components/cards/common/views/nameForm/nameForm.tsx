import React from 'react';
import { Form, renderFields, validate } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../interfaces';

interface NameFormProps {
	type: cardType;
	typeName: cardTypeName;
	onSubmit: any;
	fields: any;
	initialValues: {
		title: string;
		firstname: string;
		lastname: string;
	};
	loading: boolean;
}

const NameForm: React.FC<NameFormProps> = ({
	type,
	typeName,
	onSubmit,
	fields,
	initialValues,
	loading,
}) => {
	return (
		<Content type={type} typeName={typeName} title={`Name of the ${typeName}`}>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					title: initialValues.title,
					firstname: initialValues.firstname,
					lastname: initialValues.lastname,
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit} data-testid={`${type}-name-form`}>
						{renderFields(fields)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="up"
								iconSide="right"
								disabled={loading}
								type="submit"
								title="Save and Close"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(NameForm);
