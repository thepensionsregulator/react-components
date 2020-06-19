import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { ArrowButton } from '../buttons/buttons';
import { ArrowLink } from '../buttons/links';

describe('Buttons', () => {
	test('ArrowButton arrow is on the left side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowButton title="Confirm" testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.lastChild.textContent).toEqual('Confirm');
	});

	test('ArrowButton arrow is on the right side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowButton title="Confirm" iconSide="right" testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.firstChild.textContent).toEqual('Confirm');
	});
});

describe('Links', () => {
	test('ArrowLink arrow is on the left side', () => {
		const testId = 'arrow-button';
		const { getByTestId } = render(
			<ArrowLink title="Confirm" onClick={() => {}} testId={testId} />,
		);
		const element = getByTestId(testId);
		expect(element.firstChild.lastChild.textContent).toEqual('Confirm');
	});

	test('ArrowLink arrow is on the right side', () => {
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
