import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'table',
	extraGlobals: {
		'styled-components': 'styled',
	},
});
