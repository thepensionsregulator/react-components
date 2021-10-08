import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Poscon } from '../poscon/poscon';
import { axe } from 'jest-axe';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const hello: string = 'Hello!';
const close: string = 'I can be closed';

describe('Poscon component', () => {
	beforeEach(() => {
		cleanup();
	});

	describe('default Poscon', () => {
		test('is accessible', async () => {
			const { container } = render(<Poscon>{hello}</Poscon>);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('component renders correctly', () => {
			const { getByText } = render(
				<Poscon>
					<p>{hello}</p>
				</Poscon>,
			);

			expect(getByText(hello)).toBeDefined();
		});
	});

	describe('closable Poscon', () => {
		afterEach(() => {
			cleanup();
		});

		test('is accessible', async () => {
			const { container } = render(<Poscon enableClose={true}>{hello}</Poscon>);

			const results = await axe(container);
			expect(results).toHaveNoViolations();
		});

		test('component renders correctly', () => {
			const { getByText } = render(
				<Poscon enableClose={true}>
					<p>{close}</p>
				</Poscon>,
			);

			expect(getByText(close)).toBeDefined();
		});

		test('callback function executes', () => {
			const cb = jest.fn();

			const { getByTestId } = render(
				<Poscon enableClose={true} callback={cb}>
					<p>{close}</p>
				</Poscon>,
			);

			const closeButton = getByTestId('cross');

			act(() => {
				userEvent.click(closeButton);
			});

			expect(cb).toHaveBeenCalled();
		});
	});
});
