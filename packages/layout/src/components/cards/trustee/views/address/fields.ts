import { FieldProps } from '@tpr/forms';
import { TrusteeI18nProps } from '../../i18n';
import { RecursivePartial } from '../../context';

export const getFields = (
	labels: RecursivePartial<TrusteeI18nProps['address']['manual']['fields']>,
): FieldProps[] => [
	{
		name: 'addressLine1',
		label: labels.addressLine1.label,
		type: 'text',
		// hint: 'First line of your home address', NOTE: may not be required, keep for note but may be removed in the future.
		error: labels.addressLine1.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine2',
		label: labels.addressLine2.label,
		type: 'text',
		error: labels.addressLine2.error,
		inputWidth: 6,
		cfg: { mb: 3 },
	},
	{
		name: 'addressLine3',
		value: ' ',
		label: labels.addressLine3.label,
		type: 'text',
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
		name: 'postcode',
		label: labels.postcode.label,
		type: 'text',
		error: labels.postcode.error,
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
