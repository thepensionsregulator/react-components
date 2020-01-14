import { hexToRgb, textColorFromRgb, textColorFromHex, respondTo, mergeThemes } from '../utils';
import { assign } from 'lodash';

describe('Utils', () => {
	test('respondTo attaches media functions to media size keys', () => {
		const mediaQueries = respondTo({ sm: '64em', md: '90em' });

		expect(mediaQueries).toMatchInlineSnapshot(`
		Object {
		  "md": [Function],
		  "sm": [Function],
		}
	`);
	});

	test('mergeThemes', () => {
		const theme1 = { colors: {} };
		const theme2 = { fonts: {} };
		const mergedTheme = mergeThemes([theme1, theme2]);
		expect(mergedTheme).toEqual({ ...theme1, ...theme2 });
	});

	test('hexToRgb converts colours from hex to rgb correctly', () => {
		const redInHex = '#FF0000';
		const blackInHex = '#000000';
		const skyBlueInHex = '#66baff';

		const redInRgb = hexToRgb(redInHex);
		const blackInRgb = hexToRgb(blackInHex);
		const skyBlueInRgb = hexToRgb(skyBlueInHex);

		expect(Array.isArray(redInRgb)).toBeTruthy();
		expect(redInRgb).toEqual([255, 0, 0]);
		expect(blackInRgb).toEqual([0, 0, 0]);
		expect(skyBlueInRgb).toEqual([102, 186, 255]);
	});

	test('textColorFromRgb expect to render appropriate text colour depending on rgb colour', () => {
		expect(textColorFromHex('#000')).toBe('#FFFFFF');
		expect(textColorFromHex('#555')).toBe('#FFFFFF');
		expect(textColorFromHex('#c9c9c9')).toBe('#000000');
		expect(textColorFromHex('#FFF')).toBe('#000000');
		expect(textColorFromHex('#e892f7')).toBe('#000000');
	});

	test('textColorFromRgb expect to render appropriate text colour depending on rgb colour', () => {
		expect(textColorFromRgb([255, 0, 0])).toBe('#FFFFFF');
		expect(textColorFromRgb([0, 0, 0])).toBe('#FFFFFF');
		expect(textColorFromRgb([255, 255, 255])).toBe('#000000');
		expect(textColorFromRgb([255, 179, 201])).toBe('#000000');
		expect(textColorFromRgb([94, 13, 37])).toBe('#FFFFFF');
	});
});
