import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'ajax',
	extraGlobals: {
		lodash: 'lodash',
	},
});
