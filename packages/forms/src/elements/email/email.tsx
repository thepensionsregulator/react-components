import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';

// NOTE: composition option for validate on FFInputEmail
// const compose = (...functions: Function[]) => (args: any[]) => {
// 	return functions.reduceRight((arg, fn) => {
// 		if (typeof fn === 'function') {
// 			const fnValue = fn(arg);
// 			console.log(fnValue);
// 			if (fnValue) {
// 				return fnValue;
// 			}
// 		}
// 	}, args);
// };

export function validEmail(email: string) {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(String(email).toLowerCase());
}

type InputEmailProps = FieldRenderProps<string> & FieldExtraProps;
const InputEmail: React.FC<InputEmailProps> = ({
	label,
	hint,
	input,
	testId,
	meta,
	required,
	inputWidth: width,
	cfg,
}) => {
	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Input
				type="email"
				width={width}
				testId={testId}
				label={label}
				touched={meta && meta.touched && meta.error}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputEmail: React.FC<FieldProps & FieldExtraProps> = (
	fieldProps,
) => {
	return (
		<Field
			{...fieldProps}
			required={typeof fieldProps.validate === 'function' || fieldProps.error}
			validate={(email, allValues) => {
				// NOTE: might be a good option to use currying but then we would
				// need to provide default error message
				if (fieldProps.validate) {
					return fieldProps.validate(email, allValues);
				} else {
					return validEmail(email) ? undefined : 'Invalid email address';
				}
			}}
			component={InputEmail}
		/>
	);
};
