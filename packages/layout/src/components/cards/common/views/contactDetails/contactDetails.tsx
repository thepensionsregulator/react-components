import React from 'react';
import { Form, validate, renderFields, FieldProps } from '@tpr/forms';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../common/interfaces';
import { Link } from '@tpr/core';

interface ContactDetailsProps {
	type: cardType;
	typeName: cardTypeName;
	title: string;
	subtitle?: string;
	sectionTitle?: string;
	loading: boolean;
	onSubmit: (any) => void;
	initialValues: {
		telephoneNumber: string;
		emailAddress: string;
	};
	fields: FieldProps[];
	send?: Function;
	subSectionHeaderText?: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({
	type,
	typeName,
	title,
	subtitle,
	sectionTitle,
	loading,
	onSubmit,
	initialValues,
	fields,
	send,
	subSectionHeaderText,
}) => {
	return (
		<Content
			type={type}
			typeName={typeName}
			title={title}
			subtitle={subtitle}
			loading={loading}
			sectionTitle={sectionTitle}
			subSectionHeaderText={subSectionHeaderText}
			send={send}
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
								appearance="secondary"
								pointsTo="up"
								iconSide="right"
								type="submit"
								title="Save and close"
								disabled={loading}
							/>
								<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>Cancel</Link>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(ContactDetails);
