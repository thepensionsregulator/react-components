import React from 'react';
import { P, H5, Link } from '@tpr/core';
import { Footer } from '../../../../components/card';
import { Form, FFRadioButton, FieldProps, renderFields } from '@tpr/forms';
import { Content } from '../../../../components/content';
import { ArrowButton } from '../../../../../buttons/buttons';
import {
	cardType,
	I18nRemoveReason,
	RemoveReasonProps,
} from '../../../../common/interfaces';
import styles from './reason.module.scss';

interface ReasonProps {
	type: cardType;
	i18nRemoveReason: I18nRemoveReason;
	onSubmit: (any) => void;
	remove: RemoveReasonProps;
	dateField: FieldProps[];
	send?: Function;
}

export const Reason: React.FC<ReasonProps> = ({
	type,
	i18nRemoveReason,
	onSubmit,
	remove,
	dateField,
	send,
}) => {
	return (
		<Content type={type} title={i18nRemoveReason.title}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					reason: remove && remove.reason,
					date: remove && remove.date && new Date(remove.date),
				}}
			>
				{({ handleSubmit, submitError, form }) => {
					const reason = form.getState().values.reason;
					const showError: boolean = !!submitError && !reason;
					const leftScheme: boolean = reason === 'left_the_scheme';
					return (
						<form
							onSubmit={handleSubmit}
							data-testid={`remove-${type}-form`}
							noValidate
						>
							<div className={showError ? styles.labelError : null}>
								<fieldset>
									<legend>
										<H5 className={styles.h5Legend}>
											{i18nRemoveReason.subtitle}
										</H5>
									</legend>
									{showError && (
										<P
											role="alert"
											cfg={{ color: 'danger.2', mt: 5 }}
											className={styles.errorMessage}
										>
											{submitError}
										</P>
									)}
									<FFRadioButton
										name="reason"
										type="radio"
										testId="leftTheScheme"
										label={i18nRemoveReason.fields.leftTheScheme.label}
										value="left_the_scheme"
										cfg={{ my: 4 }}
										required={true}
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
										required={true}
									/>
								</fieldset>
							</div>
							<Footer>
								<div className={styles.actionButtons}>
									<ArrowButton
										appearance="secondary"
										pointsTo="right"
										iconSide="right"
										type="submit"
										title="Continue"
										cfg={{ mr: 3 }}
									/>
									<Link
										underline
										onClick={() => send('CANCEL')}
										className={styles.cancelButton}
									>
										Cancel
									</Link>
								</div>
							</Footer>
						</form>
					);
				}}
			</Form>
		</Content>
	);
};
