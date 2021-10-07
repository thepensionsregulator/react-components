import React, { useState } from 'react';
import { Form, renderFields, validate, FieldProps } from '@tpr/forms';
import { Flex, Link } from '@tpr/core';
import { Content } from '../../../components/content';
import { Footer } from '../../../components/card';
import { ArrowButton } from '../../../../buttons/buttons';
import { useIndependentTrusteeContext } from '../../context';
import { IndependentTrusteeI18nProps } from '../../i18n';
import { cardType, RecursivePartial } from '../../../common/interfaces';

const getIndependentTrusteeFields = (
	labels: RecursivePartial<IndependentTrusteeI18nProps['regulator']['fields']>,
): FieldProps[] => [
	{
		type: 'radio',
		name: 'regulator',
		value: 'yes',
		label: labels.appointedByRegulator.labels.isAppointedByRegulatorYes,
		cfg: { mb: 2 },
		required: true,
	},
	{
		type: 'radio',
		name: 'regulator',
		value: 'no',
		label: labels.appointedByRegulator.labels.isAppointedByRegulatorNo,
		cfg: { mb: 2 },
		required: true,
	},
];

export const Regulator: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const {
		current,
		send,
		i18n,
		onSaveAppointed,
	} = useIndependentTrusteeContext();
	const regulatorFields = getIndependentTrusteeFields(i18n.regulator.fields);
	const { independentTrustee } = current.context;

	const onSubmit = async (values) => {
		const updatedValues = {
			schemeRoleId: independentTrustee.schemeRoleId,
			appointedByRegulator: values.regulator === 'yes' ? true : false,
		};
		setLoading(true);
		await onSaveAppointed(updatedValues, independentTrustee)
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
			title={i18n.regulator.title}
			sectionTitle={i18n.regulator.sectionTitle}
			subSectionHeaderText={
				i18n.preview.buttonsAndHeadings.appointedByRegulator
			}
			send={send}
		>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					regulator: independentTrustee.appointedByRegulator ? 'yes' : 'no',
				}}
				validate={validate(regulatorFields)}
			>
				{({ handleSubmit }) => (
					<form
						onSubmit={handleSubmit}
						data-testid={`${cardType.independent}-regulator-form`}
					>
						{renderFields(regulatorFields)}
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
