import React from 'react';
import { storiesOf } from '@storybook/react';
import { P, H1, H2, H3, H4, H5, H6 } from './typography';

function Demo() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<P>P Lorem ipsum dolor sit amet consectetur</P>
			<H1 children="H1 Lorem ipsum dolor sit amet consectetur" />
			<H2 children="H2 Lorem ipsum dolor sit amet consectetur" />
			<H3 children="H3 Lorem ipsum dolor sit amet consectetur" />
			<H4 children="H4 Lorem ipsum dolor sit amet consectetur" />
			<H5 children="H5 Lorem ipsum dolor sit amet consectetur" />
			<H6 children="H6 Lorem ipsum dolor sit amet consectetur" />
		</div>
	);
}

storiesOf('typography', module)
	.add('All', () => <Demo />)
	.add('P', () => <P children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H1', () => <H1 children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H2', () => <H2 children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H3', () => <H3 children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H4', () => <H4 children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H5', () => <H5 children="Lorem ipsum dolor sit amet consectetur" />)
	.add('H6', () => <H6 children="Lorem ipsum dolor sit amet consectetur" />);
