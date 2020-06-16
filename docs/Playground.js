import React from 'react';
import { Playground as DoczPlayground } from 'docz';
import { CssResets } from '../packages/theming/src/theming';
import fetch from 'node-fetch';

export const Playground = (props) => {
	return (
		<CssResets>
			<DoczPlayground {...props} />
		</CssResets>
	);
};

export const experianApiGet = (endpoint) => {
	return fetch(`https://api.edq.com/capture/address/v2/${endpoint}`, {
		method: 'get',
		headers: {
			'Auth-Token': process.env.GATSBY_LOOKUP_API_URL,
		},
	}).then((resp) => resp.json());
};
