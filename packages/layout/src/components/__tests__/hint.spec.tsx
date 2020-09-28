import React from 'react';
import { render } from '@testing-library/react';
import { Hint } from '../hint/hint';
import { P } from '@tpr/core';

describe('Hint', () => {
	test('contains text', () => {
		const renderOutput = render(
			<Hint>
				<P>hello world</P>
			</Hint>,
		);
		expect(renderOutput.container.textContent).toContain('hello world');
	});
});
