export default {
	title: 'TPR React Components',
	description: 'React Components reused across the apps',
	typescript: true,
	propsParser: false,
	files: '**/*.{markdown,mdx}',
	ignore: [
		'changelog',
		'code_of_conduct',
		'contributing',
		'license',
		'readme',
	].map(word => `${word.toUpperCase()}.md`),
	menu: ['Home', 'Core', 'Forms'],
	themeConfig: {
		mode: 'light',
		showDarkModeSwitch: false,
	},
};
