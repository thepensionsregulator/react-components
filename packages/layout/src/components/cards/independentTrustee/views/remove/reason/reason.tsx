import React from 'react';
import { P, H4 } from '@tpr/core';
import { useIndependentTrusteeContext } from '../../../context';
import { Footer } from '../../../../components/card';
import { Form, FFRadioButton, FieldProps, renderFields } from '@tpr/forms';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import { isAfter, toDate, isBefore } from 'date-fns';
import { FORM_ERROR } from 'final-form';
import { cardType, cardTypeName } from '../../../../common/interfaces';
import styles from './reason.module.scss';

export const ReasonRemove: React.FC = () => {
	const { current, send, i18n } = useIndependentTrusteeContext();
	const { remove, independentTrustee } = current.context;

	const DateField: FieldProps[] = [
		{
			type: 'date',
			name: 'date',
			label: i18n.remove.reason.fields.date.label,
			hint: 'For example, 31 3 2019',
			cfg: { mb: 3 },
			validate: (value) => {
				if (!value) {
					return i18n.remove.reason.errors.pristine;
				} else if (
					isBefore(
						toDate(new Date(value)),
						toDate(new Date(independentTrustee.effectiveDate)),
					)
				) {
					return i18n.remove.reason.errors.dateAddedBeforeEffectiveDate;
				} else if (isAfter(toDate(new Date(value)), new Date())) {
					return i18n.remove.reason.errors.dateAddedInTheFuture;
				} else {
					return undefined;
				}
			},
		},
	];

	const onSubmit = (values: {
		reason: string; // 'left_the_scheme' | 'not_part_of_scheme'
		date?: Date;
	}) => {
		if (!values.reason) {
			return {
				[FORM_ERROR]: i18n.remove.reason.errors.pristine,
			};
		} else {
			send('SELECT', {
				values: {
					reason: values.reason,
					date:
						values.reason === 'not_part_of_scheme' ? undefined : values.date,
				},
			});
		}
	};

	return (
		<Content
			type={cardType.independent}
			typeName={cardTypeName.trustee}
			title={i18n.remove.reason.title}
		>
			<H4 fontWeight="bold" mb={0}>
				{i18n.remove.reason.subtitle}
			</H4>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					reason: remove && remove.reason,
					date: remove && remove.date && new Date(remove.date),
				}}
			>
				{({ handleSubmit, submitError, form }) => {
					const leftScheme =
						form.getState().values.reason === 'left_the_scheme';
					return (
						<form
							onSubmit={handleSubmit}
							data-testid={`remove-${cardType.independent}-form`}
						>
							<FFRadioButton
								name="reason"
								type="radio"
								label={i18n.remove.reason.fields.leftTheScheme.label}
								value="left_the_scheme"
								cfg={{ my: 4 }}
							/>
							{leftScheme && (
								<div className={styles.dateWrapper}>
									{renderFields(DateField)}
								</div>
							)}
							<FFRadioButton
								name="reason"
								type="radio"
								label={i18n.remove.reason.fields.neverPartOfTheScheme.label}
								value="not_part_of_scheme"
							/>
							{submitError && (
								<P cfg={{ color: 'danger.2', mt: 5 }}>{submitError}</P>
							)}
							<Footer>
								<ArrowButton
									intent="special"
									pointsTo="right"
									iconSide="right"
									type="submit"
									title="Continue"
								/>
							</Footer>
						</form>
					);
				}}
			</Form>
		</Content>
	);
};
