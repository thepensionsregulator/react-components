import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'css',
	extraGlobals: {
		'styled-components': 'styled-components',
		'styled-system': 'styled-system',
	},
});
