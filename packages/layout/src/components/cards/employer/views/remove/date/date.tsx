import React from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, FFCheckbox, FFInputDate } from '@tpr/forms';
import { P } from '@tpr/core';
import { Content } from '../../../../components/content';
import { Footer } from '../../../../components/card';
import { useEmployerContext } from '../../../context';
import { ArrowButton } from '../../../../../buttons/buttons';
import styles from './date.module.scss';

export const DateForm = () => {
	const { current, send } = useEmployerContext();
	const { remove } = current.context;

	const onSubmit = (values) => {
		if (!values.confirm || !values.date) {
			return {
				[FORM_ERROR]: 'Please confirm and fill in the date fields.',
			};
		} else {
			send('NEXT', { values });
			return undefined;
		}
	};

	return (
		<Content type="employer" title="Remove this employer">
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
							label="I confirm this employer is no longer associated with the scheme."
							cfg={{ mb: 3 }}
						/>
						<div className={styles.dateWrapper}>
							<FFInputDate
								name="date"
								label="Date the employer left the scheme"
								hint="For example, 31 3 2019"
								required={true}
								error="Cannot be left empty!"
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
