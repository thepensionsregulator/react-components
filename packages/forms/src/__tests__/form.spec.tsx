import { fireEvent } from '@testing-library/react';
import { formSetup } from '../__mocks__/setup';

describe('Form', () => {
	test('renders fields correctly and submitts with no errors', () => {
		const handleSubmit = jest.fn();
		const { container, form } = formSetup({
			onSubmit: handleSubmit,
			initialValues: {},
			fields: [
				{ name: 'firstName', type: 'text' },
				{ name: 'lastName', type: 'text' },
				{ name: 'email', type: 'email' },
			],
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
