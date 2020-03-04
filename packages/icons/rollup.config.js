import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'icons',
	extraGlobals: {
		'styled-components': 'styled',
	},
});
