import React from 'react';
import { P, H4 } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { Footer } from '../../../../components/card';
import { Form, FFRadioButton, FFInputDate } from '@tpr/forms';
import { FORM_ERROR } from 'final-form';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import styles from './reason.module.scss';

const RemoveReason: React.FC = () => {
	const { current, send } = useTrusteeContext();
	const { remove } = current.context;

	const onSubmit = (values) => {
		if (
			!values.reason ||
			(values.reason === 'left_the_scheme' && !values.date)
		) {
			return {
				[FORM_ERROR]:
					'Please select one of the options and fill in required fields.',
			};
		} else {
			send('SELECT', {
				values: {
					reason: values.reason,
					date: values.reason === 'left_the_scheme' ? values.date : null,
				},
			});
			return undefined;
		}
	};

	return (
		<Content type="trustee" title="Remove this trustee">
			<H4 fontWeight="bold" mb={0}>
				Why are you removing this trustee?
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
						<form onSubmit={handleSubmit}>
							<FFRadioButton
								name="reason"
								type="radio"
								label="They have left the scheme."
								value="left_the_scheme"
								cfg={{ my: 4 }}
							/>
							{leftScheme && (
								<div className={styles.dateWrapper}>
									<FFInputDate
										name="date"
										label="Date the trustee left the scheme"
										hint="For example, 31 3 2019"
										required={true}
										cfg={{ mb: 3 }}
									/>
								</div>
							)}
							<FFRadioButton
								name="reason"
								type="radio"
								label="They were never part of the scheme."
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

export default RemoveReason;
