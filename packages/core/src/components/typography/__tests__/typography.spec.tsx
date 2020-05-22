import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Text } from '../typography';
import { render } from '@testing-library/react';

describe('Typography', () => {
	test('Text renders children', () => {
		const { getByText } = render(<Text tag="p">Hello world</Text>);

		const HelloWorld = getByText(/Hello world/i);
		expect(HelloWorld).toBeDefined();
	});

	test('Text accepts cfg props', () => {
		const { getByText } = render(
			<Text tag="p" cfg={{ p: 3, m: 4, color: 'neutral.2' }}>
				Hello world
			</Text>,
		);

		expect(getByText(/Hello world/i).className).toMatchInlineSnapshot(
			`"p p-3 m-4 color-neutral-2"`,
		);
	});
});
