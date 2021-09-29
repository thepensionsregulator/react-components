import React from 'react';
import {
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	UnfoldMore,
} from '../components/arrows/arrows';
import {
	CheckedCircle,
	ErrorCircle,
	WarningCircle,
} from '../components/circle/circle';
import { Cross } from '../components/cross/cross';
import {
	CheckboxChecked,
	CheckboxBlank,
	RadioButtonChecked,
	RadioButtonUnchecked,
} from '../components/form/form';
import {
	LoadingSpinnerCircle,
	LoadingSpinnerProgress,
} from '../components/spinners/spinners';
import { SVG } from '../components/global';
import { render } from '@testing-library/react';

describe('Icons', () => {
	describe('SVG', () => {
		test('SVG component renders its children', () => {
			const testId = 'svg-icon';
			const { getByTestId } = render(
				<SVG cfg={{ fill: 'danger.1' }} testId={testId}>
					<span>Children</span>
				</SVG>,
			);
			expect(getByTestId(testId)).toBeDefined();
			expect(getByTestId(testId)).toContainHTML('<span>Children</span>');
		});
	});

	describe('Arrows', () => {
		test('Arrow Up', () => {
			const { getByTestId } = render(<ArrowUp />);
			expect(getByTestId('arrow-up')).toBeDefined();
		});

		test('Arrow Down', () => {
			const { getByTestId } = render(<ArrowDown />);
			expect(getByTestId('arrow-down')).toBeDefined();
		});

		test('Arrow Left', () => {
			const { getByTestId } = render(<ArrowLeft />);
			expect(getByTestId('arrow-left')).toBeDefined();
		});

		test('Arrow Right', () => {
			const { getByTestId } = render(<ArrowRight />);
			expect(getByTestId('arrow-right')).toBeDefined();
		});

		test('Unfold More', () => {
			const { getByTestId } = render(<UnfoldMore />);
			expect(getByTestId('unfold-more')).toBeDefined();
		});
	});

	describe('Circle', () => {
		test('Checked Circle to render without error', () => {
			const { getByTestId } = render(<CheckedCircle />);
			expect(getByTestId('checked-circle')).toBeDefined();
		});

		test('Checked Circle to be aria-hidden by default', () => {
			const { getByTestId } = render(<CheckedCircle />);
			expect(getByTestId('checked-circle')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		test('Checked Circle to not be aria-hidden if there is alternative text', () => {
			const { getByTestId, getByText } = render(
				<CheckedCircle alternativeText="Test label" />,
			);
			const icon = getByTestId('checked-circle');
			const title = getByText('Test label');
			expect(icon).toContainElement(title);
			expect(icon).not.toHaveAttribute('aria-hidden');
		});

		test('Error Circle to render without error', () => {
			const { getByTestId } = render(<ErrorCircle />);
			expect(getByTestId('error-circle')).toBeDefined();
		});

		test('Error Circle to be aria-hidden by default', () => {
			const { getByTestId } = render(<ErrorCircle />);
			expect(getByTestId('error-circle')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		test('Error Circle to not be aria-hidden if there is alternative text', () => {
			const { getByTestId, getByText } = render(
				<ErrorCircle alternativeText="Test label" />,
			);
			const icon = getByTestId('error-circle');
			const title = getByText('Test label');
			expect(icon).toContainElement(title);
			expect(icon).not.toHaveAttribute('aria-hidden');
		});

		test('Warning Circle to render without error', () => {
			const { getByTestId } = render(<WarningCircle />);
			expect(getByTestId('warning-circle')).toBeDefined();
		});

		test('Warning Circle to be aria-hidden by default', () => {
			const { getByTestId } = render(<WarningCircle />);
			expect(getByTestId('warning-circle')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		test('Warning Circle to not be aria-hidden if there is alternative text', () => {
			const { getByTestId, getByText } = render(
				<WarningCircle alternativeText="Test label" />,
			);
			const icon = getByTestId('warning-circle');
			const title = getByText('Test label');
			expect(icon).toContainElement(title);
			expect(icon).not.toHaveAttribute('aria-hidden');
		});
	});

	describe('Cross', () => {
		test('Cross', () => {
			const { getByTestId } = render(<Cross />);
			expect(getByTestId('cross')).toBeDefined();
		});
	});

	describe('Form', () => {
		test('Checkbox Checked', () => {
			const { getByTestId } = render(<CheckboxChecked />);
			expect(getByTestId('checkbox-checked')).toBeDefined();
		});

		test('Checkbox Blank', () => {
			const { getByTestId } = render(<CheckboxBlank />);
			expect(getByTestId('checkbox-blank')).toBeDefined();
		});

		test('Radio Button Checked', () => {
			const { getByTestId } = render(<RadioButtonChecked />);
			expect(getByTestId('radio-button-checked')).toBeDefined();
		});

		test('Radio Button Unchecked', () => {
			const { getByTestId } = render(<RadioButtonUnchecked />);
			expect(getByTestId('radio-button-unchecked')).toBeDefined();
		});
	});

	describe('Spinners', () => {
		test('Loading Spinner Circle', () => {
			const { getByTestId } = render(<LoadingSpinnerCircle />);
			expect(getByTestId('spinner-circle')).toBeDefined();
		});

		test('Loading Spinner Progress', () => {
			const { getByTestId } = render(<LoadingSpinnerProgress />);
			expect(getByTestId('spinner-progress')).toBeDefined();
		});
	});
});
