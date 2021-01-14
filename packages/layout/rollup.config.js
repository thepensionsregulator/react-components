import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'layout',
	extraExternal: [
		'@tpr/core',
		'@tpr/forms',
		'@tpr/icons',
		'@tpr/theming',
		'@types/lodash.merge',
		'@xstate/react',
		'final-form',
		'qs',
		'react-final-form',
		'tslib',
		'lodash.merge',
		'xstate',
		'react-collapsible',
	],
});
