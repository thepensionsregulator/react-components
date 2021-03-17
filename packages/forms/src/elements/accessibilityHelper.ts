import { toKebabCase } from '@tpr/core';

export default class AccessibilityHelper {
	constructor(
		private rootId: string,
		private hasLabel: boolean,
		private hasHint: boolean,
		private hasBefore: boolean,
		private hasAfter: boolean,
	) {
		this.rootId = toKebabCase(rootId);
	}

	get labelId(): string {
		return (this.rootId && this.hasLabel && `${this.rootId}-label`) || null;
	}
	get hintId(): string {
		return (this.rootId && this.hasHint && `${this.rootId}-hint`) || null;
	}
	get errorId(): string {
		return (this.rootId && `${this.rootId}-error`) || null;
	}
	get beforeId(): string {
		return (this.rootId && `${this.rootId}-before`) || null;
	}
	get afterId(): string {
		return (this.rootId && `${this.rootId}-after`) || null;
	}

	formatAriaDescribedBy = (isError: boolean) => {
		var describedBy: string;
		if (isError) {
			describedBy = `${this.hintId || ''} ${this.errorId || ''}`;
		} else {
			describedBy = `${this.hintId || ''} ${this.beforeId || ''} ${
				this.afterId || ''
			}`;
		}
		return describedBy.trim() || null;
	};
}
