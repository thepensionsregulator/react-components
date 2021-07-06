import { toKebabCase } from '@tpr/core';

export default class AccessibilityHelper {
	//innerHiddenLabelId: string | null;

	constructor(
		private rootId: string,
		private hasLabel: boolean,
		private hasHint: boolean,
		private hiddenLabelId: string | null = null,
	) {
		this.rootId = toKebabCase(rootId);
	}

	get labelId(): string {
		return (
			(this.rootId && this.hasLabel && `${this.rootId}-label`) ||
			this.hiddenLabelId
		);
	}
	get hintId(): string {
		return (this.rootId && this.hasHint && `${this.rootId}-hint`) || null;
	}
	get errorId(): string {
		return (this.rootId && `${this.rootId}-error`) || null;
	}

	formatAriaDescribedBy = (isError: boolean) => {
		var describedBy: string;
		if (isError) {
			describedBy = `${this.hintId || ''} ${this.errorId || ''}`;
		} else {
			describedBy = `${this.hintId || ''}`;
		}
		return describedBy.trim() || null;
	};
}
