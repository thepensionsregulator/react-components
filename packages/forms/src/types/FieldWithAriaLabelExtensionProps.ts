import { RecursivePartial } from '@tpr/layout/lib/components/cards/common/interfaces';
import { FieldProps } from 'renderFields';
import { FieldWithAriaLabelExtenstionI18nProps } from './FieldWithAriaLabelExtensionI18nProps';

export interface FieldWithAriaLabelExtensionProps extends FieldProps {
	i18n?: RecursivePartial<FieldWithAriaLabelExtenstionI18nProps>;
}
