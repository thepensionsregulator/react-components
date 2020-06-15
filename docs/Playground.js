import React from 'react';
import { Playground as DoczPlayground } from 'docz';
import { CssResets } from '../packages/theming/src';
import fetch from 'node-fetch';

export const Playground = (props) => {
	return (
		<CssResets>
			<DoczPlayground {...props} />
		</CssResets>
	);
};

console.log(process.env);

export const experianApiGet = (endpoint) => {
	return fetch(`https://api.edq.com/capture/address/v2/${endpoint}`, {
		method: 'get',
		headers: {
			'Auth-Token': process.env.DOCZ_LOOKUP_API_URL,
		},
	}).then((resp) => resp.json());
};
