import React from 'react';
import { Form } from '../index';
import { render } from '@testing-library/react';
import { FormRenderProps } from 'react-final-form';

type FormProviderProps = {
	onSubmit?: any;
	render?: any;
	initialValues?: any;
	validate?: any;
};

export const formSetup = ({
	render: renderFn = () => <div />,
	onSubmit = () => {},
	initialValues = {},
	validate,
}: FormProviderProps) => {
	let renderArg: FormRenderProps;
	const childrenSpy = jest.fn((controllerArg) => {
		renderArg = controllerArg;
		return (
			<form onSubmit={controllerArg.handleSubmit}>
				{renderFn}
				<button type="submit">Submit</button>
			</form>
		);
	});

	const utils = render(
		<Form onSubmit={onSubmit} validate={validate} initialValues={initialValues}>
			{childrenSpy}
		</Form>,
	);

	return { ...renderArg, ...utils };
};
