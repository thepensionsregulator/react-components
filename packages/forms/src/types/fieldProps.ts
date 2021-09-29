import { FieldProps, FieldExtraProps } from '../renderFields';

export interface FFInputCommonProps extends FieldProps, FieldExtraProps {
	errorEmptyValue?: string;
	errorInvalidValue?: string;
}
