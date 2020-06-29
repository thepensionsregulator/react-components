import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'layout',
	extraExternal: [
		'@tpr/core',
		'@tpr/forms',
		'@tpr/icons',
		'@tpr/theming',
		'@types/lodash',
		'@xstate/react',
		'final-form',
		'qs',
		'react-final-form',
		'tslib',
		'lodash',
		'xstate',
	],
});
