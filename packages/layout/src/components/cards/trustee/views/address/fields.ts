import { FieldProps } from '@tpr/forms';
import { TrusteeI18nProps } from '../../i18n';

export const getFields = (
	labels: TrusteeI18nProps['address']['manual']['fields'],
): FieldProps[] => [
	{
		name: 'addressLine1',
		label: labels.addressLine1,
		type: 'text',
		// hint: 'First line of your home address', NOTE: may not be required, keep for note but may be removed in the future.
		error: 'This is a required field',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine2',
		label: labels.addressLine2,
		type: 'text',
		error: 'This is a required field',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine3',
		value: ' ',
		label: labels.addressLine3,
		type: 'text',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postTown',
		label: labels.postTown,
		type: 'text',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'postcode',
		label: labels.postcode,
		type: 'text',
		error: 'This is a required field',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'county',
		label: labels.county,
		type: 'text',
		error: 'This is a required field',
		inputWidth: 6,
		cfg: { mb: 3 },
	},
];
