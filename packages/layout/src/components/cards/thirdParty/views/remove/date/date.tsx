import React from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, FFCheckbox, FFInputDate } from '@tpr/forms';
import { P } from '@tpr/core';
import { Content } from '../../../../components/content';
import { Footer } from '../../../../components/card';
import { useThirdPartyContext } from '../../../context';
import { ArrowButton } from '../../../../../buttons/buttons';
import { isAfter, toDate, isBefore } from 'date-fns';
import styles from './date.module.scss';

export const DateForm = () => {
	const { current, send, i18n } = useThirdPartyContext();
	const { remove, thirdParty } = current.context;

	const onSubmit = (values) => {
		if (!values.confirm || !values.date) {
			return {
				[FORM_ERROR]: i18n.remove.date.errors.formIncomplete,
			};
		} else if (
			isBefore(
				toDate(new Date(values.date)),
				toDate(new Date(thirdParty.effectiveDate)),
			)
		) {
			return {
				[FORM_ERROR]: i18n.remove.date.errors.dateAddedBeforeEffectiveDate,
			};
		} else if (isAfter(toDate(new Date(values.date)), new Date())) {
			return {
				[FORM_ERROR]: i18n.remove.date.errors.dateAddedInTheFuture,
			};
		} else {
			send('NEXT', { values });
			return undefined;
		}
	};

	return (
		<Content type="thirdParty" title={i18n.remove.date.title}>
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
						<div className={styles.dateWrapper}>
							<FFInputDate
								name="date"
								label={i18n.remove.date.fields.date.label}
								hint={i18n.remove.date.fields.date.hint}
								required={true}
								error={i18n.remove.date.fields.date.error}
								cfg={{ mb: 3 }}
							/>
						</div>
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
