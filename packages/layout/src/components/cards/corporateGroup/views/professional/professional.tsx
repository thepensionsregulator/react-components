import React, { useState } from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Flex, Link } from '@tpr/core';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { ArrowButton } from '../../../../buttons/buttons';
import { useCorporateGroupContext } from '../../context';
import { CorporateGroupI18nProps } from '../../i18n';
import { cardType, RecursivePartial } from '../../../common/interfaces';

const getProfessionalFields = (
	labels: RecursivePartial<CorporateGroupI18nProps['professional']['fields']>,
): FieldProps[] => [
	{
		type: 'radio',
		name: 'professional',
		value: 'yes',
		label: labels.isProfessional.labels.isProfessionalYes,
		cfg: { mb: 2 },
	},
	{
		type: 'radio',
		name: 'professional',
		value: 'no',
		label: labels.isProfessional.labels.isProfessionalNo,
		cfg: { mb: 2 },
	},
];

export const Professional: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveDirector } = useCorporateGroupContext();
	const professionalFields = getProfessionalFields(i18n.professional.fields);
	const { corporateGroup } = current.context;

	const onSubmit = async (values) => {
		const updatedValues = {
			schemeRoleId: corporateGroup.schemeRoleId,
			directorIsProfessional: values.professional === 'yes' ? true : false,
		};
		setLoading(true);
		await onSaveDirector(updatedValues, corporateGroup)
			.then(() => {
				setLoading(false);
				send('SAVE', { values });
			})
			.catch(() => {
				console.log('error');
				setLoading(false);
			});
	};

	return (
		<Content
			type={cardType.trustee}
			title={i18n.professional.title}
			sectionTitle={i18n.professional.sectionTitle}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					professional: corporateGroup.directorIsProfessional ? 'yes' : 'no',
				}}
				validate={validate(professionalFields)}
			>
				{({ handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						data-testid={`${cardType.corporateGroup}-directors-form`}
					>
						{renderFields(professionalFields)}
						<Footer>
							<Flex>
								<ArrowButton
									appearance="secondary"
									pointsTo="up"
									iconSide="right"
									disabled={loading}
									disabledText={loading ? 'Saving...' : undefined}
									title="Save and close"
									type="submit"
								/>
								<Link cfg={{ m: 3 }} underline onClick={() =>send('CANCEL')}>Cancel</Link>
							</Flex>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
