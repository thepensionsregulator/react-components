import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
import { Text } from '../typography/typography';
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

	test('Text accepts custom className', () => {
		const className = 'some-weird-class-name-here';
		const { getByText } = render(
			<Text
				tag="p"
				cfg={{ p: 3, m: 4, color: 'neutral.2' }}
				className={className}
			>
				Hello world
			</Text>,
		);

		expect(
			getByText(/Hello world/i).className.includes(className),
		).toBeTruthy();
		expect(getByText(/Hello world/i).className).toMatchInlineSnapshot(
			`"p some-weird-class-name-here p-3 m-4 color-neutral-2"`,
		);
	});
});
