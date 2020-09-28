import { FieldProps } from '@tpr/forms';
import { addressLabelsFields } from '../../interfaces';
import { RecursivePartial } from '../../../common/interfaces';
import { postcodeIsValid } from './helpers';

export const getFields = (
	labels: RecursivePartial<addressLabelsFields>,
	postcodeRegExPattern: string,
): FieldProps[] => [
	{
		name: 'addressLine1',
		type: 'text',
		label: labels.addressLine1.label,
		error: (value: string) => {
			if (!value) return labels.addressLine1.emptyError;
			return value.length < 2 ? labels.addressLine1.invalidError : undefined;
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
		error: (value: string) => {
			return !value ? labels.postTown.emptyError : undefined;
		},
		type: 'text',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postcode',
		label: labels.postcode.label,
		type: 'text',
		error: (postcode: string) => {
			if (!postcode) return labels.postcode.emptyError;
			return postcodeIsValid(postcode, postcodeRegExPattern)
				? undefined
				: labels.postcode.invalidError;
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
