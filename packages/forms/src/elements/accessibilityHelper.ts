export type InputElementDescriptorProps = {
	labelId?: string;
	hintId?: string;
	errorId?: string;
};

export default class AccessibilityHelper {

  constructor(private rootId: string, private hasLabel: boolean, private hasHint: boolean) {};
  
	get labelId(): string {
		return (this.rootId && this.hasLabel && `${this.rootId}-label`) || null;
	};
	get hintId(): string {
		return (this.rootId && this.hasHint && `${this.rootId}-hint`) || null;
	};
	get errorId(): string {
		return (this.rootId && `${this.rootId}-error`) || null;
	};

	formatAriaDescribedBy = (
		isError: boolean,
	) => {
		var describedBy: string;
		if (isError) {
			describedBy = `${this.hintId || ''} ${this.errorId || ''}`;
		} else {
			describedBy = `${this.hintId || ''}`;
		}
		return describedBy.trim() || null;
	};
}
