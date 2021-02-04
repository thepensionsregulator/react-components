import React from 'react';
import { useCorporateGroupContext } from '../../../context';
import { FieldProps } from '@tpr/forms';
import { isAfter, toDate, isBefore } from 'date-fns';
import { FORM_ERROR } from 'final-form';
import { cardType } from '../../../../common/interfaces';
import { Reason } from '../../../../common/views/remove/reason/reason';

export const ReasonRemove: React.FC = () => {
	const { current, send, i18n } = useCorporateGroupContext();
	const { remove, corporateGroup } = current.context;

	const DateField: FieldProps[] = [
		{
			type: 'date',
			name: 'date',
			label: i18n.remove.reason.fields.date.label,
			hint: 'For example, 31 3 2019',
			cfg: { mb: 3 },
			required: true,
			validate: (value) => {
				if (!value) {
					return i18n.remove.reason.errors.pristineDate;
				} else if (
					isBefore(
						toDate(new Date(value)),
						toDate(new Date(corporateGroup.effectiveDate)),
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
		<Reason
			type={cardType.trustee}
			i18nRemoveReason={i18n.remove.reason}
			onSubmit={onSubmit}
			remove={remove}
			dateField={DateField}
		/>
	);
};
