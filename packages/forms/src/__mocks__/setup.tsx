import React from 'react';
import { Form, renderFields } from '../utils/forms';
import { FieldProps } from '../utils/validation';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../../theming';
import { FormRenderProps } from 'react-final-form';

type FormProviderProps = {
	onSubmit?: any;
	initialValues: any;
	fields?: FieldProps[];
};
const FormProvider: React.FC<FormProviderProps> = ({
	onSubmit,
	initialValues,
	children,
}) => (
	<ThemeProvider theme={lightTheme}>
		<Form onSubmit={onSubmit} initialValues={initialValues}>
			{children}
		</Form>
	</ThemeProvider>
);

export function formSetup({
	onSubmit,
	initialValues,
	fields,
}: FormProviderProps) {
	let renderArg: FormRenderProps;
	const childrenSpy = jest.fn(controllerArg => {
		renderArg = controllerArg;
		return (
			<form onSubmit={controllerArg.handleSubmit}>
				{renderFields(fields)}
				<button type="submit">Submit</button>
			</form>
		);
	});

	const utils = render(
		<FormProvider
			onSubmit={onSubmit}
			initialValues={initialValues}
			fields={fields}
		>
			{childrenSpy}
		</FormProvider>,
	);

	return { ...renderArg, ...utils };
}
