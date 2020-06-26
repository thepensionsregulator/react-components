import React from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';

const getFields = ({ fields }: any): FieldProps[] => [
	{
		type: 'text',
		name: 'telephoneNumber',
		label: fields.telephone,
		inputWidth: 2,
		error: 'Enter a telephone number, like 0163 960 598 or +44 7700 900 359',
		cfg: { mb: 3 },
	},
	{
		type: 'email',
		name: 'emailAddress',
		label: fields.email,
		inputWidth: 6,
		error: 'Cannot be empty',
	},
];

const Contacts: React.FC = () => {
	const { current, send, i18n } = useTrusteeContext();
	const { trustee, loading } = current.context;
	const fields = getFields(i18n.contacts);

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
