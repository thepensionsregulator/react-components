import React from 'react';
import { Form, validate, renderFields, FieldProps } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../common/interfaces';

interface ContactDetailsProps {
	type: cardType;
	typeName: cardTypeName;
	title: string;
	subtitle?: string;
	loading: boolean;
	onSubmit: (any) => void;
	initialValues: {
		telephoneNumber: string;
		emailAddress: string;
	};
	fields: FieldProps[];
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
	type,
	typeName,
	title,
	subtitle,
	loading,
	onSubmit,
	initialValues,
	fields,
}) => {
	return (
		<Content
			type={type}
			typeName={typeName}
			title={title}
			subtitle={subtitle}
			loading={loading}
			sectionTitle={`Edit ${typeName ? typeName : type}`}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: initialValues.telephoneNumber,
					emailAddress: initialValues.emailAddress,
				}}
				validate={validate(fields)}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit} data-testid={`${type}-contact-form`}>
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
		</Content>
	);
};

export default React.memo(ContactDetails);
