export default {
	port: 6006,
	title: 'TPR React Components',
	description: 'React Components reused across the apps',
	typescript: true,
	// propsParser: false, for some reason causes infinite loop on dev server
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
