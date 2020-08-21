import React, { useState } from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useActuaryContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { ActuaryI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

const getFields = (
	fields: RecursivePartial<ActuaryI18nProps['contacts']['fields']>,
): FieldProps[] => [
	{
		type: 'phone',
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
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveContacts } = useActuaryContext();
	const { actuary } = current.context;
	const fields = getFields(i18n?.contacts?.fields);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			await onSaveContacts(values, actuary);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<Content
			type="actuary"
			typeName="Actuary"
			title={i18n.contacts.title}
			subtitle={i18n.contacts.subtitle}
			loading={loading}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					telephoneNumber: actuary.telephoneNumber,
					emailAddress: actuary.emailAddress,
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
