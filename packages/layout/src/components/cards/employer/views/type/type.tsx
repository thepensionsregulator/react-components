import React, { useState } from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { useEmployerContext } from '../../context';
import { ArrowButton } from '../../../../buttons/buttons';
import { EmployerI18nProps } from '../../i18n';

const getFields = (
	labels: EmployerI18nProps['type']['fields'],
): FieldProps[] => [
	{
		type: 'radio',
		hint: labels.employerType.principal.hint,
		name: 'employerType',
		value: 'principal-employer',
		label: labels.employerType.principal.label,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		hint: labels.employerType.principalAndParticipating.hint,
		name: 'employerType',
		value: 'principal-and-participating',
		label: labels.employerType.principalAndParticipating.label,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		hint: labels.employerType.participating.hint,
		name: 'employerType',
		value: 'participating-employer',
		label: labels.employerType.participating.label,
		cfg: { mb: 4 },
	},
];

export const EmployerType = () => {
	const [loading, setLoading] = useState(false);
	const { send, current, i18n, onSaveType } = useEmployerContext();
	const fields = getFields(i18n.type.fields);
	const { employer } = current.context;

	async function onSubmit(values) {
		const updatedValues = {
			schemeRoleId: employer.schemeRoleId,
			employerType: values.employerType,
		};
		setLoading(true);
		await onSaveType(updatedValues, employer)
			.then(() => {
				setLoading(false);
				send('SAVE', { values });
			})
			.catch(() => {
				setLoading(false);
			});
	}

	return (
		<Content
			type="employer"
			title={i18n.type.title}
			subtitle={i18n.type.subtitle}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					employerType: employer.employerType,
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
								disabled={loading}
								disabledText="Saving..."
								title="Save and close"
								type="submit"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
