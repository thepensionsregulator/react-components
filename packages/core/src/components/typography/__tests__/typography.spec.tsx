import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { H1 } from '../typography';
import { render } from '@testing-library/react';

describe('Typography', () => {
	test('H1 renders with text', () => {
		const { getByText } = render(
			<H1 cfg={{ p: 3, m: 4, color: 'neutral.2' }}>Hello world</H1>,
		);

		const HelloWorld = getByText(/Hello world/i);
		expect(HelloWorld).toBeDefined();
	});
});
