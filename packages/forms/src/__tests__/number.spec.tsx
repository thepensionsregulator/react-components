import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputNumber } from '../elements/number/number';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

const testId = 'number-input';

const numberComponent = (
	<FFInputNumber label="Number" testId={testId} name="number" />
);

const numberComponentWithDecimals = (
	<FFInputNumber
		label="Number"
		testId={testId}
		name="number"
		decimalPlaces={2}
	/>
);

describe('Number', () => {
	describe('normal behaviour', () => {
		test('is accessible', async () => {
			const { container } = formSetup({
				render: numberComponent,
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('values get captured correctly', async () => {
			const { getByTestId } = formSetup({
				render: numberComponent,
			});

			userEvent.type(getByTestId(testId), '123');
			expect(getByTestId(testId)).toHaveValue(123);
		});
	});

	describe('formatting values with decimal places specified on onBlur event', () => {
		test('formatting integers', async () => {
			const { getByTestId } = formSetup({
				render: numberComponentWithDecimals,
			});

			userEvent.type(getByTestId(testId), '12345');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(12345.0);
		});

		test('formatting float numbers', async () => {
			const { getByTestId } = formSetup({
				render: numberComponentWithDecimals,
			});

			userEvent.type(getByTestId(testId), '1234.4');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(1234.4);
		});
	});

	describe('specifying max length props', () => {
		test('adding maxLength', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={3}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '123456');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(123);
		});

		test('adding maxIntDigits', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxIntDigits={3}
						decimalPlaces={2}
					/>
				),
			});
			userEvent.type(getByTestId(testId), '123456.5');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(123.5);
		});

		test('adding maxIntDigits & maxLength', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={7}
						maxIntDigits={3}
						decimalPlaces={2}
					/>
				),
			});
			userEvent.type(getByTestId(testId), '123456.12345');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(123.12);
		});

		test('adding maxIntDigits & maxLength in negative number', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={7}
						maxIntDigits={3}
						decimalPlaces={2}
					/>
				),
			});
			userEvent.type(getByTestId(testId), '-123456.12345');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(-123.12);
		});

		test('renders readonly', () => {
			const { queryByTestId } = formSetup({
				render: (
					<FFInputNumber testId="text-input" name="name" readOnly={true} />
				),
			});

			const label = queryByTestId('text-input');
			expect(label).toHaveAttribute('readonly');
		});
	});

	describe('When decimal places are zero', () => {
		test('decimal point cannot be used', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={3}
						decimalPlaces={0}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '1.2');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(12);
		});
	});
	describe('When decimal places are not specified', () => {
		test('decimal point cannot be used', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={3}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '1.2');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(12);
		});
	});
	describe('When decimal places are non-zero', () => {
		test('decimal point can be used', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						maxLength={3}
						decimalPlaces={1}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '1.2');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue(1.2);
		});
	});

	test('has correct describedby tag when an error is shown', () => {
		const numberRequired = 'Number is required';

		const handleSubmit = jest.fn();
		const { getByTestId, queryByText } = formSetup({
			render: (
				<FFInputNumber
					label="Number"
					testId={testId}
					name="number"
					required={true}
					maxLength={3}
					decimalPlaces={1}
					validate={(value) => (value ? undefined : numberRequired)}
				/>
			),
			onSubmit: handleSubmit,
		});

		getByTestId(testId).focus();
		getByTestId(testId).blur();

		const errorMessage = queryByText(numberRequired);
		expect(errorMessage).toBeInTheDocument();
		expect(errorMessage).toHaveAttribute('id', 'number_error');
		expect(getByTestId(testId)).toHaveAttribute('aria-invalid', 'true');
		expect(getByTestId(testId)).toHaveAttribute(
			'aria-describedby',
			'number_error',
		);
	});
});
