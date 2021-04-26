import React from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../interfaces';
import { Link } from '@tpr/core';

interface NameFormProps {
	type: cardType;
	typeName: cardTypeName | string;
	title: string;
	sectionTitle?: string;
	onSubmit: (any) => void;
	fields: FieldProps[];
	initialValues: {
		title: string;
		firstName: string;
		lastName: string;
	};
	loading: boolean;
	nextStep?: boolean;
	send?: Function;
	subSectionHeaderText?: string;
}

const NameForm: React.FC<NameFormProps> = ({
	type,
	typeName,
	title,
	sectionTitle,
	onSubmit,
	fields,
	initialValues,
	loading,
	nextStep,
	send,
	subSectionHeaderText,
}) => {
	return (
		<Content
			type={type}
			typeName={typeName}
			title={title}
			loading={loading}
			sectionTitle={sectionTitle}
			subSectionHeaderText={subSectionHeaderText}
			send={send}
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
								appearance="secondary"
								pointsTo={nextStep ? 'right' : 'up'}
								iconSide="right"
								disabled={loading}
								type="submit"
								title={nextStep ? 'Continue' : 'Save and close'}
							/>
							<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
								Cancel
							</Link>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(NameForm);
