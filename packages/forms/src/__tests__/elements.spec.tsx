import {
	formatAriaDescribedBy,
	getElementDescriptors,
} from '../elements/elements';

describe('getElementDescriptors', () => {
	test('returns correctly formatted ids', async () => {
		const rootId = 'test-id';
		const descriptors = getElementDescriptors(rootId, true, true);
		expect(descriptors).not.toBeNull();
		expect(descriptors.labelId).toBe(`${rootId}-label`);
		expect(descriptors.hintId).toBe(`${rootId}-hint`);
		expect(descriptors.errorId).toBe(`${rootId}-error`);
	});
	test('returns null for unavailable elements', async () => {
		const rootId = 'test-id';
		const descriptors = getElementDescriptors(rootId, false, false);
		expect(descriptors.labelId).toBeNull();
		expect(descriptors.hintId).toBeNull();
		expect(descriptors.errorId).toBe(`${rootId}-error`);
	});
});

describe('formatAriaDescribedBy', () => {
	test('returns element list for an error where both ids supplied', async () => {
		const hintId = 'test-id-hint';
		const errorId = 'test-id-error';
		const describedBy = formatAriaDescribedBy(hintId, errorId, true);
		expect(describedBy).toBe(`${hintId} ${errorId}`);
	});
	test('returns only hintId for no error where both ids supplied', async () => {
		const hintId = 'test-id-hint';
		const errorId = 'test-id-error';
		const describedBy = formatAriaDescribedBy(hintId, errorId, false);
		expect(describedBy).toBe(hintId);
	});
	test('returns errorId for an error where hintId is not supplied', async () => {
		const hintId = null;
		const errorId = 'test-id-error';
		const describedBy = formatAriaDescribedBy(hintId, errorId, true);
		expect(describedBy).toBe(errorId);
	});
	test('returns null for no error where hintId is not supplied', async () => {
		const hintId = null;
		const errorId = 'test-id-error';
		const describedBy = formatAriaDescribedBy(hintId, errorId, false);
		expect(describedBy).toBeNull();
	});
	test('returns hintId for an error where errorId is not supplied', async () => {
		const hintId = 'test-id-hint';
		const errorId = null;
		const describedBy = formatAriaDescribedBy(hintId, errorId, true);
		expect(describedBy).toBe(hintId);
	});
	test('returns hintId for no error where errorId is not supplied', async () => {
		const hintId = 'test-id-hint';
		const errorId = null;
		const describedBy = formatAriaDescribedBy(hintId, errorId, false);
		expect(describedBy).toBe(hintId);
	});
});
