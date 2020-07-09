import React from 'react';
import { render } from '@testing-library/react';
import { ArrowButton } from '../buttons/buttons';
import { ArrowLink } from '../buttons/links';
import { axe } from 'jest-axe';

describe('ArrowButton', () => {
	test('is accessible', async () => {
		const { container } = render(<ArrowButton title="Confirm" />);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('arrow is on the left side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowButton title="Confirm" testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.lastChild.textContent).toEqual('Confirm');
	});

	test('arrow is on the right side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowButton title="Confirm" iconSide="right" testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.firstChild.textContent).toEqual('Confirm');
	});
});

describe('ArrowLink', () => {
	test('is accessible', async () => {
		const { container } = render(
			<ArrowLink title="Confirm" onClick={() => {}} />,
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('arrow is on the left side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowLink title="Confirm" onClick={() => {}} testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.lastChild.textContent).toEqual('Confirm');
	});

	test('arrow is on the right side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowLink
				title="Confirm"
				onClick={() => {}}
				iconSide="right"
				testId={testId}
			/>,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.firstChild.textContent).toEqual('Confirm');
	});
});
