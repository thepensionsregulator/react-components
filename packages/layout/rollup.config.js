import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'layout',
	extraExternal: [
		'@tpr/core',
		'@tpr/forms',
		'@tpr/icons',
		'@tpr/theming',
		'@xstate/react',
		'final-form',
		'qs',
		'react-final-form',
		'tslib',
		'xstate',
	],
});
