import React from 'react';
import { render } from '@testing-library/react';
import { HelpLink } from '../helplink/helplink';

describe('HelpLink', () => {
	test('displays title', () => {
		const renderOutput = render(
			<HelpLink title="HelpLink Title">This is some HelpLink content</HelpLink>,
		);
		expect(renderOutput.container.textContent).toContain('HelpLink Title');
	});
	test('display content', () => {
		const renderOutput = render(
			<HelpLink title="HelpLink Title">This is some HelpLink content</HelpLink>,
		);
		expect(renderOutput.container.textContent).toContain(
			'This is some HelpLink content',
		);
	});
});
