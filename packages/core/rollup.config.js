import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'core',
	extraGlobals: {
		'styled-components': 'styled-components',
		'styled-system': 'styled-system',
	},
});
