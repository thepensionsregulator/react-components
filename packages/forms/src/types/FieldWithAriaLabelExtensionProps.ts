import { FieldProps } from '../renderFields';
import { FieldWithAriaLabelExtenstionI18nProps } from './FieldWithAriaLabelExtensionI18nProps';
import { RecursivePartial } from './RecursivePartial';

export interface FieldWithAriaLabelExtensionProps extends FieldProps {
	i18n?: RecursivePartial<FieldWithAriaLabelExtenstionI18nProps>;
}
