import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputNumber } from '../elements/number/number';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';
import { sleep } from '@tpr/core/src/testHelpers';

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

const numberComponentWithi18n = (
	<FFInputNumber
		label="Number"
		testId={testId}
		name="number"
		i18n={{ ariaLabelExtension: 'extended aria label' }}
	/>
);

const numberComponentWithArialLabelAndi18n = (
	<FFInputNumber
		aria-label="Number"
		testId={testId}
		name="number"
		i18n={{ ariaLabelExtension: 'extended aria label' }}
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

		test('default wrapper element is label', () => {
			const { getByText } = formSetup({
				render: numberComponent,
			});

			const label = getByText(/Number/);

			expect(label.parentElement.tagName).toBe('LABEL');
		});

		test('wrapper element can be changed', () => {
			const { getByText } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						wrapperElement="div"
					/>
				),
			});

			const label = getByText(/Number/);

			expect(label.parentElement.tagName).toBe('DIV');
		});

		test('label renders with an id attribute', () => {
			const { getByText } = formSetup({
				render: numberComponent,
			});

			const label = getByText(/Number/);

			expect(label).toBeDefined();
			expect(label).toHaveAttribute('id', 'number-label');
		});

		test('renders with a default aria-label', () => {
			const { getByTestId } = formSetup({
				render: numberComponent,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute('aria-label', 'Number');
		});

		test('renders an aria-label when given a label and an aria label extension', () => {
			const { getByTestId } = formSetup({
				render: numberComponentWithi18n,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute('aria-label', 'Number extended aria label');
		});

		test('renders an aria-label when given an aria-label and an aria label extension', () => {
			const { getByTestId } = formSetup({
				render: numberComponentWithArialLabelAndi18n,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute('aria-label', 'Number extended aria label');
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
		test('field with initial value renders with decimal places set', async () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="number"
						decimalPlaces={2}
						initialValue={15}
					/>
				),
			});

			// There is a setTimeout function in the number.tsx so we
			// need to wait for that to complete before running the
			// test assertions
			await sleep(1000);

			var inputNumberField = await getByTestId(testId);
			expect(inputNumberField).toHaveAttribute('value', '15.00');
		});
		test('form with initial values renders with decimal places set', async () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputNumber
						label="Number"
						testId={testId}
						name="rpiIncrease"
						decimalPlaces={2}
					/>
				),
				initialValues: { rpiIncrease: 2.5 },
			});

			// There is a setTimeout function in the number.tsx so we
			// need to wait for that to complete before running the
			// test assertions
			await sleep(1000);

			var inputNumberField = await getByTestId(testId);
			expect(inputNumberField).toHaveAttribute('value', '2.50');
		});
	});

	test('has correct describedby tag when an error is shown', () => {
		const numberRequired = 'Number is required';
		const name = 'numberInput';
		const hint = 'This explains how to complete the field';

		const handleSubmit = jest.fn();
		const { getByTestId, getByText } = formSetup({
			render: (
				<FFInputNumber
					label="Number"
					testId={testId}
					name={name}
					hint={hint}
					required={true}
					maxLength={3}
					decimalPlaces={1}
					validate={(value) => (value ? undefined : numberRequired)}
				/>
			),
			onSubmit: handleSubmit,
		});

		const numberTest = getByTestId(testId);
		CheckDescribedByTag(getByText, numberTest, numberRequired, hint);
	});
});
