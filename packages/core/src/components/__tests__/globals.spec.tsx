import React from 'react';
import { render } from '@testing-library/react';
import { Flex } from '../globals/globals';

describe('Flex', () => {
	test('Flex renders correctly and accepts testId prop', () => {
		const { getByTestId } = render(<Flex testId="flex" />);
		expect(getByTestId(/flex/i)).toBeDefined();
	});

	test('Flex accepts cfg with flex props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ flex: '1 1 auto' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('flex-1-1-auto')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with flexDirection props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ flexDirection: 'column' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('flexDirection-column')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with alignItems props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ alignItems: 'center' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('alignItems-center')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with justifyContent props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ justifyContent: 'flex-end' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(
			Component.className.includes('justifyContent-flex-end'),
		).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex component rerenders appropriately when cfg props change', () => {
		const { rerender, getByTestId } = render(
			<Flex cfg={{ flex: '1 1 auto' }} testId="flex" />,
		);
		expect(
			getByTestId(/flex/i).className.includes('flex-1-1-auto'),
		).toBeTruthy();
		rerender(<Flex cfg={{ flex: '0 0 auto' }} testId="flex" />);
		expect(
			getByTestId(/flex/i).className.includes('flex-0-0-auto'),
		).toBeTruthy();
	});

	test('Flex cfg can change background color', () => {
		const { getByTestId } = render(
			<Flex cfg={{ bg: 'neutral.2' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('bg-neutral-2')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts custom className', () => {
		const className = 'some-weird-class-name-here';
		const { getByTestId } = render(
			<Flex
				cfg={{ p: 3, m: 4, bg: 'primary.2' }}
				className={className}
				testId="flex"
			/>,
		);
		expect(getByTestId('flex').className.includes(className)).toBeTruthy();
		expect(getByTestId('flex').className).toMatchInlineSnapshot(
			`"flex some-weird-class-name-here p-3 m-4 bg-primary-2"`,
		);
	});

	test('Flex accepts cfg with cursor props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ cursor: 'pointer' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('cursor-pointer')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with width props', () => {
		const { getByTestId } = render(<Flex cfg={{ width: 5 }} testId="flex" />);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('width-5')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with color props', () => {
		const { getByTestId } = render(
			<Flex cfg={{ color: 'warning.3' }} testId="flex" />,
		);
		const Component = getByTestId(/flex/i);
		expect(Component.className.includes('color-warning-3')).toBeTruthy();
		expect(Component).toBeDefined();
	});

	test('Flex accepts cfg with typography props', () => {
		const { getByTestId, rerender } = render(
			<Flex cfg={{ fontSize: 3 }} testId="flex" />,
		);
		expect(getByTestId(/flex/i).className.includes('fontSize-3')).toBeTruthy();
		rerender(<Flex cfg={{ textAlign: 'center' }} testId="flex" />);
		expect(
			getByTestId(/flex/i).className.includes('textAlign-center'),
		).toBeTruthy();
		rerender(<Flex cfg={{ fontWeight: 2 }} testId="flex" />);
		expect(
			getByTestId(/flex/i).className.includes('fontWeight-2'),
		).toBeTruthy();
	});

	test('Flex accepts cfg with space props', () => {
		const { getByTestId, rerender } = render(
			<Flex cfg={{ m: 3 }} testId="flex" />,
		);
		expect(getByTestId(/flex/i).className.includes('m-3')).toBeTruthy();
		rerender(<Flex cfg={{ p: 3 }} testId="flex" />);
		expect(getByTestId(/flex/i).className.includes('p-3')).toBeTruthy();
		rerender(<Flex cfg={{ pl: 3 }} testId="flex" />);
		expect(getByTestId(/flex/i).className.includes('pl-3')).toBeTruthy();
		rerender(<Flex cfg={{ pr: 3 }} testId="flex" />);
		expect(getByTestId(/flex/i).className.includes('pr-3')).toBeTruthy();
	});
});
