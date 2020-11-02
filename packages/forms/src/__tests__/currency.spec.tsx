import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputCurrency } from '../elements/currency/currency';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';

const testId = 'currency-input';

const currencyComponent = (
	<FFInputCurrency label="Currency" testId={testId} name="currency" />
);

describe('Currency', () => {
	describe('normal behaviour', () => {
		test('is accessible', async () => {
			const { container } = formSetup({
				render: currencyComponent,
			});
			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('values get captured correctly', async () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			userEvent.type(getByTestId(testId), '123');
			expect(getByTestId(testId)).toHaveValue('123');
		});
	});

	describe('formatting integers', () => {
		test('value gets formatted correctly while typing', async () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			userEvent.type(getByTestId(testId), '123456789');
			expect(getByTestId(testId)).toHaveValue('123,456,789');
		});

		test('value gets formatted correctly on onBlur event', async () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			userEvent.type(getByTestId(testId), '123456789');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue('123,456,789.00');
		});
	});

	describe('formatting float numbers', () => {
		test('value gets formatted correctly while typing', async () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			userEvent.type(getByTestId(testId), '123456789.55');
			expect(getByTestId(testId)).toHaveValue('123,456,789.55');
		});

		test('value gets formatted correctly on onBlur event', async () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			userEvent.type(getByTestId(testId), '123456789.4');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue('123,456,789.40');
		});
	});

	describe('specifying maxInputLength & decimalPlaces props', () => {
		test('adding the amount of decimal places specified', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputCurrency
						label="Currency"
						testId={testId}
						name="currency"
						maxInputLength={11}
						decimalPlaces={3}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '123456');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue('123,456.000');
		});

		test('adding the missing decimal places to reach the amount specified', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputCurrency
						label="Currency"
						testId={testId}
						name="currency"
						maxInputLength={11}
						decimalPlaces={3}
					/>
				),
			});

			userEvent.type(getByTestId(testId), '12345.5');
			fireEvent.blur(getByTestId(testId));
			expect(getByTestId(testId)).toHaveValue('12,345.500');
		});

		test('renders readonly', () => {
			const { queryByTestId } = formSetup({
				render: (
					<FFInputCurrency testId="text-input" name="name" readOnly={true} />
				),
			});

			const label = queryByTestId('text-input');
			expect(label).toHaveAttribute('readonly');
		});
	});
});
