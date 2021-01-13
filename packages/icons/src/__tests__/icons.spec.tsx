import React from 'react';
import {
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	UnfoldMore,
} from '../components/arrows/arrows';
import { CheckedCircle, ErrorCircle } from '../components/circle/circle';
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
		test('SVG component renders it`s children', () => {
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
		test('Checked Circle', () => {
			const { getByTestId } = render(<CheckedCircle />);
			expect(getByTestId('checked-circle')).toBeDefined();
		});

		test('Error Circle', () => {
			const { getByTestId } = render(<ErrorCircle />);
			expect(getByTestId('error-circle')).toBeDefined();
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
