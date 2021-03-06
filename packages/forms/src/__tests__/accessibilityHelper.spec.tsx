import AccessibilityHelper from '../elements/accessibilityHelper';

const rootId = 'test-id';

describe('helper properties', () => {
	test('return correctly formatted ids', async () => {
		const helper = new AccessibilityHelper(rootId, true, true);
		expect(helper.labelId).toBe(`${rootId}-label`);
		expect(helper.hintId).toBe(`${rootId}-hint`);
		expect(helper.errorId).toBe(`${rootId}-error`);
	});
	test('return null for unavailable elements', async () => {
		const helper = new AccessibilityHelper(rootId, false, false);
		expect(helper.labelId).toBeNull();
		expect(helper.hintId).toBeNull();
		expect(helper.errorId).toBe(`${rootId}-error`);
	});
	test('correctly apply kebab case', async () => {
		const camelCaseId = 'camelCaseId';
		const formattedId = 'camel-case-id';
		const helper = new AccessibilityHelper(camelCaseId, true, true);
		expect(helper.labelId).toBe(`${formattedId}-label`);
		expect(helper.hintId).toBe(`${formattedId}-hint`);
		expect(helper.errorId).toBe(`${formattedId}-error`);
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
