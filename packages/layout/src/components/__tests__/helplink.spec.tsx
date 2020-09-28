import React from 'react';
import { render } from '@testing-library/react';
import { HelpLink } from '../helplink/helplink';

describe('HelpLink', () => {
	test('displays title', () => {
		const renderOutput = render(
			<HelpLink
				fields={{
					Title: 'HelpLink Title',
					Content: 'This is some HelpLink content',
				}}
			/>,
		);
		console.log(renderOutput);
		expect(renderOutput.container.textContent).toContain('HelpLink Title');
	});
});
