import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'icons',
	extraExternal: ['@tpr/core'],
});
