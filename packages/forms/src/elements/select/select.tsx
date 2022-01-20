import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { FieldProps, FieldOptions, FieldExtraProps } from '../../renderFields';
import govuk from './govuk-frontend.module.scss';
import { Select as GovUkSelect } from '@tpr/govuk-react-jsx';
import elementStyles from '../elements.module.scss';
import { classNames } from '@tpr/core';

interface SelectProps extends FieldExtraProps {
	options?: FieldOptions[];
	notFoundMessage?: string;
	addPlaceholderOption?: boolean;
	optionalFieldLabel?: string;
}

export const Select: React.FC<
	SelectProps & FieldRenderProps<string>
> = React.forwardRef<HTMLSelectElement, SelectProps & FieldRenderProps<string>>(
	(
		{
			id,
			options,
			label,
			ariaLabel,
			required,
			hint,
			meta,
			notFoundMessage,
			disabled,
			testId = 'select',
			addPlaceholderOption,
			placeholder,
			optionalFieldLabel = '(optional)',
			...rest
		},
		ref,
	) => {
		if (label && !id) {
			throw 'When specifying a visible label you must specify an id';
		}

		const buildItemsArray = () => {
			const initialOption = addPlaceholderOption
				? [{ children: placeholder || '', value: '' }]
				: [];
			if (!options || !options.length) {
				if (notFoundMessage) {
					return initialOption.concat([
						{ children: notFoundMessage, value: '' },
					]);
				}
				return [];
			} else {
				return initialOption.concat(
					options.map((x) => {
						return { children: x.label, value: JSON.stringify(x.value) };
					}),
				);
			}
		};

		return (
			<GovUkSelect
				ref={ref}
				className={classNames([
					elementStyles.select,
					addPlaceholderOption ? elementStyles.selectWithPlaceholder : '',
				])}
				govukClassNames={govuk}
				errorMessage={
					meta && meta.touched && meta.error
						? {
								children: meta.error,
						  }
						: undefined
				}
				hint={{
					children: hint,
				}}
				id={id}
				items={buildItemsArray()}
				aria-label={ariaLabel}
				label={{
					children: label + (required ? '' : ' ' + optionalFieldLabel),
				}}
				data-testid={testId}
				disabled={disabled || undefined}
				required={required || undefined}
				{...rest}
			/>
		);
	},
);

export const FFSelect: React.FC<
	FieldProps & Omit<SelectProps, 'children'>
> = React.forwardRef<
	HTMLSelectElement,
	FieldProps & Omit<SelectProps, 'children'>
>((fieldProps, ref) => {
	return (
		<Field
			{...fieldProps}
			required={fieldProps.required}
			ref={ref}
			render={({ input, initialSelectedItem, ...props }: any) => {
				return <Select ref={ref} {...props} />;
			}}
		/>
	);
});
