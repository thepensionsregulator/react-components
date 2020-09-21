import React from 'react';
import { Footer } from '../../../../components/card';
import { Form, FFRadioButton, FieldProps, renderFields } from '@tpr/forms';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import {
	P,
	H4,
	cardType,
	I18nRemoveReason,
	RemoveReasonProps,
} from '@tpr/core';
import styles from './reason.module.scss';

interface ReasonProps {
	type: cardType;
	i18nRemoveReason: I18nRemoveReason;
	onSubmit: (any) => void;
	remove: RemoveReasonProps;
	dateField: FieldProps[];
}

export const Reason: React.FC<ReasonProps> = ({
	type,
	i18nRemoveReason,
	onSubmit,
	remove,
	dateField,
}) => {
	return (
		<Content type={type} title={i18nRemoveReason.title}>
			<H4 fontWeight="bold" mb={0}>
				{i18nRemoveReason.subtitle}
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
						<form onSubmit={handleSubmit} data-testid={`remove-${type}-form`}>
							<FFRadioButton
								name="reason"
								type="radio"
								label={i18nRemoveReason.fields.leftTheScheme.label}
								value="left_the_scheme"
								cfg={{ my: 4 }}
							/>
							{leftScheme && (
								<div className={styles.dateWrapper}>
									{renderFields(dateField)}
								</div>
							)}
							<FFRadioButton
								name="reason"
								type="radio"
								label={i18nRemoveReason.fields.neverPartOfTheScheme.label}
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
