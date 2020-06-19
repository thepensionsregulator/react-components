import React from 'react';
import { CheckboxChecked } from '../icons';
import { render } from '@testing-library/react';

describe('Icons', () => {
	test('SVG component renders it`s children', () => {
		const testId = 'svg-icon';
		const { getByTestId } = render(
			<CheckboxChecked cfg={{ fill: 'danger.1' }} testId={testId} />,
		);

		expect(getByTestId(testId)).toBeDefined();
		expect(getByTestId(testId).innerHTML).toMatchInlineSnapshot(
			`"<path d=\\"M 354.5 1304.5  L 387.5 1304.5  L 387.5 1337.5  L 354.5 1337.5  L 354.5 1304.5  Z \\" fill-rule=\\"nonzero\\" fill=\\"#f2f2f2\\" stroke=\\"none\\"></path><path d=\\"M 353 1303  L 389 1303  L 389 1339  L 353 1339  L 353 1303  Z \\" stroke-width=\\"4\\" stroke=\\"#585858\\" fill=\\"none\\"></path><path d=\\"M 359.571428571429 1321  L 368.142857142857 1329.57142857143  \\" stroke-width=\\"8.57142857142857\\" stroke=\\"#036db8\\" fill=\\"none\\"></path><path d=\\"M 368.142857142857 1329.57142857143  L 382.428571428571 1309.57142857143  \\" stroke-width=\\"8.57142857142857\\" stroke=\\"#036db8\\" fill=\\"none\\"></path>"`,
		);
	});
});
