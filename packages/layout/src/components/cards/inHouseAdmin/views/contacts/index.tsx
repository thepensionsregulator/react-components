import React from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { InHouseAdminI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

const getFields = (
	fields: RecursivePartial<InHouseAdminI18nProps['contacts']['fields']>,
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

export const Contacts: React.FC = () => {
	const { current, send, i18n } = useInHouseAdminContext();
	const { inHouseAdmin } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	const loading = false;

	return (
		<Content
			type="inHouseAdmin"
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			loading={loading}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: inHouseAdmin.telephoneNumber,
					emailAddress: inHouseAdmin.emailAddress,
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
