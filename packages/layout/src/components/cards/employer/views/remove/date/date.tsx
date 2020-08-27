import React from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, FFCheckbox, FieldProps, renderFields } from '@tpr/forms';
import { P } from '@tpr/core';
import { Content } from '../../../../components/content';
import { Footer } from '../../../../components/card';
import { useEmployerContext } from '../../../context';
import { ArrowButton } from '../../../../../buttons/buttons';
import { isAfter, toDate, isBefore } from 'date-fns';
import { cardType } from '../../../../common/interfaces';
import styles from './date.module.scss';

export const DateForm = () => {
	const { current, send, i18n } = useEmployerContext();
	const { remove, employer } = current.context;

	const DateField: FieldProps[] = [
		{
			type: 'date',
			name: 'date',
			label: i18n.remove.date.fields.date.label,
			hint: i18n.remove.date.fields.date.hint,
			validate: (value) => {
				if (!value) {
					return i18n.remove.date.errors.formIncomplete;
				} else if (
					isBefore(
						toDate(new Date(value)),
						toDate(new Date(employer.effectiveDate)),
					)
				) {
					return i18n.remove.date.errors.dateAddedBeforeEffectiveDate;
				} else if (isAfter(toDate(new Date(value)), new Date())) {
					return i18n.remove.date.errors.dateAddedInTheFuture;
				}
			},
			error: i18n.remove.date.fields.date.error,
		},
	];

	const onSubmit = (values) => {
		if (!values.confirm) {
			return {
				[FORM_ERROR]: i18n.remove.date.errors.formIncomplete,
			};
		} else {
			send('NEXT', { values });
		}
	};

	return (
		<Content type={cardType.employer} title={i18n.remove.date.title}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					confirm: remove?.confirm,
					date: remove && remove.date && new Date(remove.date),
				}}
			>
				{({ handleSubmit, submitError }) => (
					<form onSubmit={handleSubmit}>
						<FFCheckbox
							name="confirm"
							type="checkbox"
							label={i18n.remove.date.fields.confirm.label}
							cfg={{ mb: 3 }}
						/>
						<div className={styles.dateWrapper}>{renderFields(DateField)}</div>
						{submitError && (
							<P cfg={{ color: 'danger.2', mt: 5 }}>{submitError}</P>
						)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="right"
								iconSide="right"
								title="Continue"
								type="submit"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};
