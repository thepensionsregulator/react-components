import React from 'react';
import { FieldProps } from '@tpr/forms';
import { useActuaryContext } from '../../../context';
import { isAfter, toDate, isBefore } from 'date-fns';
import DateForm from '../../../../common/views/remove/date/date';
import { cardType, cardTypeName } from '../../../../common/interfaces';

export const RemoveDateForm = () => {
	const { current, send, i18n } = useActuaryContext();
	const { remove, actuary } = current.context;

	const DateField: FieldProps[] = [
		{
			type: 'date',
			name: 'date',
			label: i18n.remove.date.fields.date.label,
			hint: i18n.remove.date.fields.date.hint,
			required: true,
			validate: (value) => {
				if (!value) {
					return i18n.remove.date.errors.formIncomplete;
				} else if (
					isBefore(
						toDate(new Date(value)),
						toDate(new Date(actuary.effectiveDate)),
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
		send('NEXT', { values });
	};

	return (
		<DateForm
			title={i18n.remove.date.title}
			onSubmit={onSubmit}
			remove={remove}
			label={i18n.remove.date.fields.confirm.label}
			checkboxErrorMessage={i18n.remove.date.errors.confirmMissing}
			dateField={DateField}
			type={cardType.actuary}
			typeName={cardTypeName.actuary}
			send={send}
		/>
	);
};
