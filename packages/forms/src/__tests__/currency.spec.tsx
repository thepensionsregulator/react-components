import React from 'react';
import { formSetup } from '../__mocks__/setup';
import { FFInputCurrency } from '../elements/currency/currency';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import {
	calculateCursorPosition,
	getNumberOfCommas,
} from '../elements/helpers';
import { CheckDescribedByTag } from '../utils/aria-describedByTest';

const testId = 'currency-input';

const currencyComponent = (
	<FFInputCurrency label="Currency" testId={testId} name="currency" />
);

const currencyComponentWithi18n = (
	<FFInputCurrency
		label="Currency"
		testId={testId}
		name="currency"
		i18n={{ ariaLabelExtension: 'extended aria label' }}
	/>
);

const currencyComponentWithArialLabelAndi18n = (
	<FFInputCurrency
		aria-label="Currency"
		testId={testId}
		name="currency"
		i18n={{ ariaLabelExtension: 'extended aria label' }}
	/>
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

		test('label renders with an id attribute', () => {
			const { getByText } = formSetup({
				render: currencyComponent,
			});

			const label = getByText(/Currency/);

			expect(label).toBeDefined();
			expect(label).toHaveAttribute('id', 'currency-label');
		});

		test('renders with a default aria-label', () => {
			const { getByTestId } = formSetup({
				render: currencyComponent,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute('aria-label', 'Currency, in pounds');
		});

		test('renders an aria-label when given a label and an aria label extension', () => {
			const { getByTestId } = formSetup({
				render: currencyComponentWithi18n,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute(
				'aria-label',
				'Currency extended aria label',
			);
		});

		test('renders an aria-label when given an aria-label and an aria label extension', () => {
			const { getByTestId } = formSetup({
				render: currencyComponentWithArialLabelAndi18n,
			});

			const input = getByTestId(testId);

			expect(input).toBeDefined();
			expect(input).toHaveAttribute(
				'aria-label',
				'Currency extended aria label',
			);
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

	describe('passing initial value', () => {
		test('receives a number and applies the format', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputCurrency
						label="Currency"
						testId={testId}
						name="currency"
						maxInputLength={11}
						decimalPlaces={2}
						initialValue={35050}
					/>
				),
			});
			setTimeout(() => {
				expect(getByTestId(testId)).toHaveValue('35,050.00');
			}, 100);
		});

		test('receives null', () => {
			const { getByTestId } = formSetup({
				render: (
					<FFInputCurrency
						label="Currency"
						testId={testId}
						name="currency"
						maxInputLength={11}
						decimalPlaces={2}
						initialValue={null}
					/>
				),
			});
			expect(getByTestId(testId)).toHaveValue('');
		});

		test('receives null and then changes to number && custom validator', () => {
			let val = null;
			let validateExecuted = false;
			const { getByTestId } = formSetup({
				render: (
					<FFInputCurrency
						label="Currency"
						testId={testId}
						name="currency"
						maxInputLength={11}
						decimalPlaces={2}
						initialValue={val}
						validate={() => (validateExecuted = true)}
					/>
				),
			});
			setTimeout(() => {
				val = 45000;
			}, 100);
			setTimeout(() => {
				expect(getByTestId(testId)).toHaveValue('45,000.00');
			}, 100);
			expect(validateExecuted).toEqual(true);
		});
	});

	describe('testing helper function: getNumberOfCommas', () => {
		test('no value & no pos? received', () => {
			const commasNull = getNumberOfCommas(null);
			const commasUndefined = getNumberOfCommas(undefined);
			expect(commasNull).toBe(0);
			expect(commasUndefined).toBe(0);
		});

		test('value received, no pos? received', () => {
			const commas = getNumberOfCommas('111,222,333.44');
			expect(commas).toBe(2);
		});

		test('value received, with no commas before pos? received', () => {
			const commas = getNumberOfCommas('111,222,333.44', 2);
			expect(commas).toBe(0);
		});

		test('value received, with commas before pos? received', () => {
			const commas = getNumberOfCommas('111,222,333.44', 6);
			expect(commas).toBe(1);
		});
	});

	describe('testing helper function: calculateCursorPosition', () => {
		describe('cursor at the beggining', () => {
			const prevValue = '1,223.55';

			test('new value is greater', () => {
				// '1,223.55' & cursor:0 & commasBefore:0
				// add a new digit '1' => value: '11,223.55'
				const myFakeEvent = {
					target: {
						selectionStart: 9,
						selectionEnd: 9,
						value: '11,223.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					0,
					myFakeEvent,
					prevValue,
					0,
					false,
				);
				expect(newCursorPosition).toStrictEqual([1, 1]);
			});

			test('new value is smaller', () => {
				// '1,223.55' & cursor:0 & commasBefore:0
				// pressing 'Delete' key => value: '223.55'
				const myFakeEvent = {
					target: {
						selectionStart: 6,
						selectionEnd: 6,
						value: '223.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					0,
					myFakeEvent,
					prevValue,
					0,
					true,
				);
				expect(newCursorPosition).toStrictEqual([0, 0]);
			});
		});

		describe('cursor not at the beggining', () => {
			test('new value is greater and contains same number of commas', () => {
				// '1,112,223.55' & cursor:4 (before '2') & commasBefore:1
				// type '3' using => value: '11,132,223.55'
				const prevValue = '1,112,223.55';
				const myFakeEvent = {
					target: {
						selectionStart: 13,
						selectionEnd: 13,
						value: '11,132,223.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					4,
					myFakeEvent,
					prevValue,
					1,
					false,
				);
				expect(newCursorPosition).toStrictEqual([5, 5]);
			});

			test('new value is greater and contains more number of commas', () => {
				// '112,223.55' & cursor:6 (before '3') & commasBefore:1
				// type '4' using => value: '1,122,243.55'
				const prevValue = '112,223.55';
				const myFakeEvent = {
					target: {
						selectionStart: 12,
						selectionEnd: 12,
						value: '1,122,243.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					6,
					myFakeEvent,
					prevValue,
					1,
					false,
				);
				expect(newCursorPosition).toStrictEqual([8, 8]);
			});

			test('new value is smaller and contains same number of commas', () => {
				// '11,112,223.55' & cursor:9 (before '3') & commasBefore:2
				// delete '2' using 'Backspace' key => value: '1,111,223.55'
				const prevValue = '11,112,223.55';
				const myFakeEvent = {
					target: {
						selectionStart: 10,
						selectionEnd: 10,
						value: '1,111,223.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					9,
					myFakeEvent,
					prevValue,
					2,
					false,
				);
				expect(newCursorPosition).toStrictEqual([8, 8]);
			});

			test('new value is smaller and contains less number of commas', () => {
				// '1,112,223.55' & cursor:9 (after '3') & commasBefore:2
				// delete '3' using 'Backspace' key => value: '111,222.55'
				const prevValue = '1,112,223.55';
				const myFakeEvent = {
					target: {
						selectionStart: 10,
						selectionEnd: 10,
						value: '111,222.55',
					},
				};
				const newCursorPosition = calculateCursorPosition(
					9,
					myFakeEvent,
					prevValue,
					2,
					false,
				);
				expect(newCursorPosition).toStrictEqual([7, 7]);
			});
		});
	});

	test('has correct describedby tag when an error is shown', () => {
		const numberRequired = 'Currency is required';
		const name = 'currency';

		const handleSubmit = jest.fn();
		const { getByTestId, getByText } = formSetup({
			render: (
				<FFInputCurrency
					label="Currency"
					testId={testId}
					name={name}
					required={true}
					validate={(value) => (value ? undefined : numberRequired)}
				/>
			),
			onSubmit: handleSubmit,
		});

		const currencyTest = getByTestId(testId);
		CheckDescribedByTag(getByText, currencyTest, numberRequired);
	});
});
