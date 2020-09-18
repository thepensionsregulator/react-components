import React, { useState } from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Flex, Link, B, cardType, RecursivePartial, EmployerI18nProps } from '@tpr/core';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { useEmployerContext } from '../../context';
import { ArrowButton } from '../../../../buttons/buttons';

const getTypeFields = (
	labels: RecursivePartial<EmployerI18nProps['type']['fields']>,
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

const getStatutoryFields = (
	labels: RecursivePartial<EmployerI18nProps['statutory']['fields']>,
): FieldProps[] => [
	{
		type: 'radio',
		hint: labels.statutoryEmployer.statutory.hint,
		name: 'statutoryEmployer',
		value: 'statutory',
		label: labels.statutoryEmployer.statutory.label,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		hint: labels.statutoryEmployer.nonStatutory.hint,
		name: 'statutoryEmployer',
		value: 'non-statutory',
		label: labels.statutoryEmployer.nonStatutory.label,
		cfg: { mb: 2 },
	},
];

export const EmployerType: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { send, current, i18n, onSaveType } = useEmployerContext();
	const typeFields = getTypeFields(i18n?.type?.fields);
	const statutoryFields = getStatutoryFields(i18n?.statutory?.fields);
	const { employer } = current.context;

	async function onSubmit(values) {
		const updatedValues = {
			schemeRoleId: employer.schemeRoleId,
			employerType: values.employerType,
			statutoryEmployer: values.statutoryEmployer,
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
			type={cardType.employer}
			title={i18n.type.title}
			subtitle={i18n.type.subtitle}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					employerType: employer.employerType,
					statutoryEmployer: employer.statutoryEmployer,
				}}
				validate={validate(typeFields)}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{renderFields(typeFields)}
						<B>{i18n.statutory.title}</B>
						{renderFields(statutoryFields)}
						<Footer>
							<Flex>
								<ArrowButton
									intent="special"
									pointsTo="up"
									iconSide="right"
									disabled={loading}
									disabledText={loading ? 'Saving...' : undefined}
									title="Save and close"
									type="submit"
								/>
								<Link cfg={{ m: 3 }} underline onClick={() => send('CANCEL')}>
									Cancel
								</Link>
							</Flex>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
