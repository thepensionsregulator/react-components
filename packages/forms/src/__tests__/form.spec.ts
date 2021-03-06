import { fireEvent } from '@testing-library/react';
import { formSetup } from '../__mocks__/setup';
import { renderFields } from '../index';
import { axe } from 'jest-axe';

describe('Form', () => {
	test('is accessible', async () => {
		const handleSubmit = jest.fn();
		const { container } = formSetup({
			render: renderFields([
				{ name: 'firstName', type: 'text', label: 'First Name' },
				{ name: 'lastName', type: 'text', label: 'Last Name' },
				{ name: 'email', type: 'email', label: 'Email' },
			]),
			onSubmit: handleSubmit,
			initialValues: {},
		});
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders fields correctly and submitts with no errors', () => {
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			render: renderFields([
				{ label: 'First Name', name: 'firstName', type: 'text' },
				{ label: 'Last Name', name: 'lastName', type: 'text' },
				{ label: 'Email', name: 'email', type: 'email' },
			]),
			onSubmit: handleSubmit,
			initialValues: {},
		});

		const firstName = container.querySelector('input[name="firstName"]');
		const lastName = container.querySelector('input[name="lastName"]');
		const email = container.querySelector('input[name="email"]');
		const submit = container.querySelector('button[type="submit"]');

		fireEvent.change(firstName, {
			target: {
				value: 'Kursgesaght',
			},
		});

		fireEvent.change(lastName, {
			target: {
				value: 'Vladimir',
			},
		});

		fireEvent.change(email, {
			target: {
				value: 'kursgesaght.vladimir@tpr.gov.uk',
			},
		});

		fireEvent.click(submit);

		expect(handleSubmit).toBeCalledTimes(1);
		expect(form.getState().invalid).toBeFalsy();
		expect(form.getState().values).toMatchInlineSnapshot(`
		Object {
		  "email": "kursgesaght.vladimir@tpr.gov.uk",
		  "firstName": "Kursgesaght",
		  "lastName": "Vladimir",
		}
	`);
	});
});
