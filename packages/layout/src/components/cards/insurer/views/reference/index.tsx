import React from 'react';
import { Form, validate, FieldProps, renderFields } from '@tpr/forms';
import { useInsurerContext } from '../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';
import { ArrowButton } from '../../../../buttons/buttons';
import { InsurerI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

const getFields = (
	fields: RecursivePartial<InsurerI18nProps['reference']['fields']>,
): FieldProps[] => [
	{
		type: 'text',
		name: 'insurerCompanyReference',
		label: fields.insurerCompanyReference.label,
		inputWidth: 5,
		error: fields.insurerCompanyReference.error,
		cfg: { mb: 3 },
	},
];

export const Reference: React.FC = () => {
	const { current, send, i18n } = useInsurerContext();
	const { insurer } = current.context;
	const fields = getFields(i18n?.reference?.fields);

	const onSubmit = (values) => {
		send('SAVE', { values });
	};

	return (
		<Content
			type="insurer"
			title={i18n.reference.title}
			subtitle={i18n.reference.subtitle}
			loading={false}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					insurerCompanyReference: insurer.insurerCompanyReference,
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
								disabled={false}
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
