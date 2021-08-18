import { formSetup } from '../__mocks__/setup';
import { renderFields, validate } from '../index';
import { FieldProps } from '../renderFields';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { HiddenLabelIdGenerator } from '../elements/date/services/HiddenLabelIdGenerator';

// TODO: write more test when there are clear specs for date input validation

describe('Date input', () => {
	test('is accessible', async () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('date fields accepts only numbers', () => {
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(dd, 'sss');
		userEvent.type(mm, 'eeee');
		userEvent.type(yyyy, 'something');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toEqual({});
	});

	test('date fields are being rendered within the form and submits when data is correct', () => {
		const id = 'test-date';
		const fields: FieldProps[] = [
			{
				id: id,
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const fieldset = container.querySelector('fieldset');
		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		expect(fieldset).not.toBeNull();
		expect(fieldset).toHaveAttribute('aria-labelledby', `${id}-label`);
		expect(fieldset).toHaveAttribute('aria-describedby', `${id}-hint`);
		expect(dd).toHaveAttribute('type', 'number');
		expect(mm).toHaveAttribute('type', 'number');
		expect(yyyy).toHaveAttribute('type', 'number');

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(dd, '20');
		userEvent.type(mm, '12');
		userEvent.type(yyyy, '2019');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "date-1": "2019-12-20",
		}
	`);
	});

	test('date field errors when submitted with incorrect values or empty', () => {
		const fields: FieldProps[] = [
			{
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				name: 'date-1',
				type: 'date',
				required: true,
				error: 'This is a required field',
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});
		const submit = container.querySelector('button[type="submit"]');

		userEvent.click(submit);
		const formState = form.getState();

		expect(formState.hasValidationErrors).toBeTruthy();
		expect(formState.invalid).toBeTruthy();
		expect(formState.values).toEqual({});
		expect(formState.touched).toMatchInlineSnapshot(`
		Object {
		  "date-1": true,
		}
	`);
		expect(formState.errors).toMatchInlineSnapshot(`
		Object {
		  "date-1": "This is a required field",
		}
	`);
		expect(handleSubmit).toBeCalledTimes(0);
	});

	test('date fields render readonly', () => {
		const id = 'test-date';
		const fields: FieldProps[] = [
			{
				id: id,
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
				readOnly: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		expect(dd).toHaveAttribute('readonly');
		expect(mm).toHaveAttribute('readonly');
		expect(yyyy).toHaveAttribute('readonly');
	});

	test('date fields do not set autocomplete', () => {
		const fields: FieldProps[] = [
			{
				id: 'test-date',
				name: 'date-1',
				label: 'passport-expiry',
				hint: 'For example, 12 11 2007',
				type: 'date',
				required: true,
			},
		];
		const { container } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: jest.fn(),
		});

		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		expect(dd).not.toHaveAttribute('autocomplete');
		expect(mm).not.toHaveAttribute('autocomplete');
		expect(yyyy).not.toHaveAttribute('autocomplete');
	});

	test('using the hideDay prop', () => {
		const id = 'test-date';
		const fields: FieldProps[] = [
			{
				id: id,
				name: 'month-year-only',
				label: 'month-year-only',
				hint: 'For example, 11 2007',
				type: 'date',
				required: true,
				hideDay: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		expect(dd).toBe(null);
		expect(mm).toBeDefined();
		expect(yyyy).toBeDefined();

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(mm, '10');
		userEvent.type(yyyy, '2020');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toEqual({
			'month-year-only': '2020-10-01',
		});
	});

	test('using the hideDay & hideMonth props', () => {
		const id = 'test-date';
		const fields: FieldProps[] = [
			{
				id: id,
				name: 'month-year-only',
				label: 'month-year-only',
				hint: 'For example, 11 2007',
				type: 'date',
				required: true,
				hideDay: true,
				hideMonth: true,
			},
		];
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields(fields),
			validate: validate(fields),
			onSubmit: handleSubmit,
		});

		const dd = container.querySelector(`input[data-testid="dd-field"]`);
		const mm = container.querySelector(`input[data-testid="mm-field"]`);
		const yyyy = container.querySelector(`input[data-testid="yyyy-field"]`);

		expect(dd).toBe(null);
		expect(mm).toBe(null);
		expect(yyyy).toBeDefined();

		const submit = container.querySelector('button[type="submit"]');

		userEvent.type(yyyy, '2020');

		userEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().values).toEqual({
			'month-year-only': '2020-01-01',
		});
	});

	describe('testing hiddenLabel prop', () => {
		let dateContainer, findByText, hiddenLabelId;
		const fields: FieldProps[] = [
			{
				name: 'date-1',
				type: 'date',
				id: 'date-id',
				hint: 'For example, 12 11 2007',
				hiddenLabel: 'When was your passport issued',
			},
		];

		beforeEach(() => {
			const handleSubmit = jest.fn();

			const { container, getByText } = formSetup({
				render: renderFields(fields),
				validate: validate(fields),
				onSubmit: handleSubmit,
			});

			dateContainer = container;
			findByText = getByText;

			hiddenLabelId = HiddenLabelIdGenerator(fields[0].hiddenLabel);
		});

		test('hidden div with correct Id contains hiddenLabel text', () => {
			const theDiv = findByText(fields[0].hiddenLabel);

			expect(theDiv).toBeDefined();

			expect(theDiv).toHaveAttribute('id', hiddenLabelId);
		});

		test('aria-describedby has Id of hidden label div', () => {
			const fieldSet = dateContainer.getElementsByTagName('fieldset')[0];

			expect(fieldSet).toHaveAttribute('aria-describedby', hiddenLabelId);
		});
	});
});
