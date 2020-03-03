export default {
	title: 'TPR React Components',
	description: 'React Components reused across the apps',
	typescript: true,
	propsParser: false,
	files: '**/*.{md,markdown,mdx}',
	ignore: ['changelog', 'code_of_conduct', 'contributing', 'license'].map(
		word => `${word.toUpperCase()}.md`,
	),
};
