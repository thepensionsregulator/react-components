import { FieldProps } from '../renderFields';
import { FieldWithAriaLabelExtensionI18nProps as FieldWithAriaLabelExtensionI18nProps } from './FieldWithAriaLabelExtensionI18nProps';
import { RecursivePartial } from './RecursivePartial';

export interface FieldWithAriaLabelExtensionProps extends FieldProps {
	i18n?: RecursivePartial<FieldWithAriaLabelExtensionI18nProps>;
}
