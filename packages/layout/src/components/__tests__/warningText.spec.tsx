import React from 'react';
import { render } from '@testing-library/react';
import { P } from '@tpr/core';
import { WarningText } from '../warningText/warningText';

describe('WarningText', () => {
	test('Renders with expected text and role', () => {
		// Arrange
		const warningBoxText = 'This is the warning text';
		const iconFallbackText = 'Icon fallback text';

		// Act
		const { getByRole, getByTitle } = render(
			<WarningText iconFallbackText={iconFallbackText}>
				<P>{warningBoxText}</P>
			</WarningText>,
		);

		let warningBox = getByRole('alert');

		// Assert
		expect(warningBox).toBeDefined();
		expect(warningBox).toHaveTextContent(warningBoxText);
		expect(getByTitle(iconFallbackText)).toBeDefined();
	});
});
