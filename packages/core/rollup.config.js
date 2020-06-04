import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'core',
	extraExternal: [
		'@tpr/theming',
		'@xstate/react',
		'final-form',
		'qs',
		'react-final-form',
		'xstate',
	],
});
