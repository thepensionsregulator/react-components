import AccessibilityHelper from '../elements/accessibilityHelper';

const rootId = 'test-id';

describe('getElementDescriptors', () => {
	test('returns correctly formatted ids', async () => {
		const helper = new AccessibilityHelper(rootId, true, true);
		expect(helper.labelId).toBe(`${rootId}-label`);
		expect(helper.hintId).toBe(`${rootId}-hint`);
		expect(helper.errorId).toBe(`${rootId}-error`);
	});
	test('returns null for unavailable elements', async () => {
		const rootId = 'test-id';
		const helper = new AccessibilityHelper(rootId, false, false);
		expect(helper.labelId).toBeNull();
		expect(helper.hintId).toBeNull();
		expect(helper.errorId).toBe(`${rootId}-error`);
	});
});

describe('formatAriaDescribedBy', () => {
	test('returns element list for an error where both label and hint supplied', async () => {
		const helper = new AccessibilityHelper(rootId, true, true);
		const describedBy = helper.formatAriaDescribedBy(true);
		expect(describedBy).toBe(`${helper.hintId} ${helper.errorId}`);
	});
	test('returns only hintId for no error where both label and hint supplied', async () => {
		const helper = new AccessibilityHelper(rootId, true, true);
		const describedBy = helper.formatAriaDescribedBy(false);
		expect(describedBy).toBe(helper.hintId);
	});
	test('returns errorId for an error where hint is not supplied', async () => {
		const helper = new AccessibilityHelper(rootId, true, false);
		const describedBy = helper.formatAriaDescribedBy(true);
		expect(describedBy).toBe(helper.errorId);
	});
	test('returns null for no error where hint is not supplied', async () => {
		const helper = new AccessibilityHelper(rootId, true, false);
		const describedBy = helper.formatAriaDescribedBy(false);
		expect(describedBy).toBeNull();
	});
	test('returns element list for an error where label is not supplied', async () => {
		const helper = new AccessibilityHelper(rootId, false, true);
		const describedBy = helper.formatAriaDescribedBy(true);
		expect(describedBy).toBe(`${helper.hintId} ${helper.errorId}`);
	});
	test('returns hintId for no error where label is not supplied', async () => {
		const helper = new AccessibilityHelper(rootId, false, true);
		const describedBy = helper.formatAriaDescribedBy(false);
		expect(describedBy).toBe(helper.hintId);
	});
	test('returns errorId for an error where neither hint nor label is supplied', async () => {
		const helper = new AccessibilityHelper(rootId, false, false);
		const describedBy = helper.formatAriaDescribedBy(true);
		expect(describedBy).toBe(helper.errorId);
	});
	test('returns null for no error where hint nor label is supplied', async () => {
		const helper = new AccessibilityHelper(rootId, false, false);
		const describedBy = helper.formatAriaDescribedBy(false);
		expect(describedBy).toBeNull();
	});
});
