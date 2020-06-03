import { classNames, filterProps } from '../utils';
import { matchClassName } from '../utils';

describe('classNames', () => {
	test('classNames can accept an array of strings and merge them into one string', () => {
		const cssClass = classNames(['i', 'have', 'many', 'class', 'names']);
		expect(cssClass).toMatchInlineSnapshot(`"i have many class names"`);
	});

	test('classNames can handle objects in an array', () => {
		const cssClass1 = classNames([
			'i',
			'have',
			{ many: true },
			'class',
			'names',
		]);
		expect(cssClass1).toMatchInlineSnapshot(`"i have many class names"`);
		const cssClass2 = classNames([
			'i',
			'have',
			{ many: false },
			'class',
			'names',
		]);
		expect(cssClass2).toMatchInlineSnapshot(`"i have class names"`);
	});

	test('classNames can handle arrays with objects in an initial array', () => {
		const cssClass = classNames([
			'i',
			'have',
			[
				{ many: true },
				{ many: false },
				{ loads: true },
				'another-one',
				[{ 'and-another-one': true }],
			],
			'class',
			'names',
		]);
		expect(cssClass).toMatchInlineSnapshot(
			`"i have many loads another-one and-another-one class names"`,
		);
	});
});

describe('filterProps', () => {
	// NOTE: testing on existing class names is not going to work because of jest setup.
	test('filterProps can format and match class names to the ones declared in the cfg styles', () => {
		const result = filterProps({ flex: '1 1 auto', color: 'neutral.3' });
		expect(result).toMatchInlineSnapshot(`
		Object {
		  "color-neutral-3": true,
		  "flex-1-1-auto": true,
		}
	`);
	});

	test('filterProps will pass on truthy names', () => {
		const result: any = filterProps({ 'some-other-style-name': true });
		expect(result['some-other-style-name']).toBeTruthy();
	});
});
