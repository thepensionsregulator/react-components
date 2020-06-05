import React from 'react';
import { Playground as DoczPlayground } from 'docz';
import ThemeProvider from '../packages/theming/src';

export const Playground = (props) => {
	return (
		<ThemeProvider>
			<DoczPlayground {...props} />
		</ThemeProvider>
	);
};
