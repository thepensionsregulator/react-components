import { FieldProps } from '@tpr/forms';
import { addressLabelsFields } from '../../interfaces';
import { RecursivePartial } from '../../../common/interfaces';
import { validPostcode } from './helpers';

export const getFields = (
	labels: RecursivePartial<addressLabelsFields>,
): FieldProps[] => [
	{
		name: 'addressLine1',
		type: 'text',
		label: labels.addressLine1.label,
		error: (value: string) => {
			if (!value) return labels.addressLine1.emptyError;
			return value.length < 3 ? labels.addressLine1.invalidError : undefined;
		},
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine2',
		type: 'text',
		label: labels.addressLine2.label,
		error: labels.addressLine2.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine3',
		value: ' ',
		type: 'text',
		label: labels.addressLine3.label,
		error: labels.addressLine3.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postTown',
		label: labels.postTown.label,
		type: 'text',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postCode',
		label: labels.postCode.label,
		type: 'text',
		error: (postCode: string) => {
			if (!postCode) return labels.postCode.emptyError;
			return validPostcode(postCode) ? undefined : labels.postCode.invalidError;
		},
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'county',
		label: labels.county.label,
		type: 'text',
		error: labels.county.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
];
