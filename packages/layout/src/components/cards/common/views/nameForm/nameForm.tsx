import React from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../interfaces';

interface NameFormProps {
	type: cardType;
	typeName: cardTypeName | string;
	title: string;
	onSubmit: (any) => void;
	fields: FieldProps[];
	initialValues: {
		title: string;
		firstName: string;
		lastName: string;
	};
	loading: boolean;
	nextStep?: boolean;
}

const NameForm: React.FC<NameFormProps> = ({
	type,
	typeName,
	title,
	onSubmit,
	fields,
	initialValues,
	loading,
	nextStep,
}) => {
	return (
		<Content
			type={type}
			typeName={typeName}
			title={title}
			loading={loading}
			sectionTitle={`Edit ${typeName ? typeName : type}`}
		>
			<Form
				onSubmit={onSubmit}
				validate={validate(fields)}
				initialValues={{
					title: initialValues.title,
					firstName: initialValues.firstName,
					lastName: initialValues.lastName,
				}}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit} data-testid={`${type}-name-form`}>
						{renderFields(fields)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo={nextStep ? 'right' : 'up'}
								iconSide="right"
								disabled={loading}
								type="submit"
								title={nextStep ? 'Continue' : 'Save and close'}
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(NameForm);
