import React from 'react';
import { Playground as DoczPlayground } from 'docz';
import { CssResets } from '../packages/theming/src';

export const Playground = (props) => {
	return (
		<CssResets>
			<DoczPlayground {...props} />
		</CssResets>
	);
};
