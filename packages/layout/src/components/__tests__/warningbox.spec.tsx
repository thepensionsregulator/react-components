import React from 'react';
import { render } from '@testing-library/react';
import { P } from '@tpr/core';
import { WarningBox } from '../warning/warning';

describe('WarningBox', () => {
	test('Renders with expected text and role', () => {
		// Arrange
		const warningBoxText = 'This is the warning text';
		const warningLabelText = 'warning-label-text';

		// Act
		const { getByRole, getByTitle } = render(
			<WarningBox warningLabel={warningLabelText}>
				<P>{warningBoxText}</P>
			</WarningBox>,
		);

		let warningBox = getByRole('alert');

		// Assert
		expect(warningBox).toBeDefined();
		expect(warningBox).toHaveTextContent(warningBoxText);
		expect(getByTitle(warningLabelText)).toBeDefined();
	});
});
