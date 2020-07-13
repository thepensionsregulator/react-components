import React from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { TrusteeI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

const getFields = (
	fields: RecursivePartial<TrusteeI18nProps['contacts']['fields']>,
): FieldProps[] => [
	{
		type: 'text',
		name: 'telephoneNumber',
		label: fields.telephone.label,
		inputWidth: 2,
		error: fields.telephone.error,
		cfg: { mb: 3 },
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: fields.email.label,
		inputWidth: 6,
		error: fields.email.error,
	},
];

const Contacts: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const { trustee, loading } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<Content
			type="trustee"
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			loading={loading}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: trustee.telephoneNumber,
					emailAddress: trustee.emailAddress,
				}}
				validate={validate(fields)}
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
		</Content>
	);
};

export default Contacts;
