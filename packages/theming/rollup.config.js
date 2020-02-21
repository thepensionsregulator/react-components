import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'theming',
	extraGlobals: {
		'styled-components': 'styled',
		lodash: 'lodash',
	},
});
