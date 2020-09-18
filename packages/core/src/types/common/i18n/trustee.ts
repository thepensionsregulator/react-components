import { I18nRemoveReason } from '../interfaces';

export type TrusteeI18nProps = {
	address: {
		title: string;
		postcode: {
			title: string;
			link: string;
			button: string;
		};
		auto: {
			title: string;
			subtitle: string;
			dropdown: {
				placeholder: string;
				link: string;
				error: string;
			};
		};
		manual: {
			subtitle: string;
			fields: {
				addressLine1: {
					label: string;
					emptyError?: string;
					invalidError: string;
				};
				addressLine2: { label: string; error?: string };
				addressLine3: { label: string; error?: string };
				postTown: { label: string; error?: string };
				postcode: {
					label: string;
					invalidError?: string;
					emptyError?: string;
				};
				county: { label: string; error?: string };
			};
		};
	};
	contacts: {
		title: string;
		subtitle: string;
		fields: {
			telephone: {
				label: string;
				error: string;
			};
			email: {
				label: string;
				error: string;
			};
		};
	};
	name: {
		title: string;
		fields: {
			title: {
				label: string;
			};
			firstName: {
				label: string;
				error: string;
			};
			lastName: {
				label: string;
				error: string;
			};
		};
	};
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
	};
	remove: {
		confirm: {
			title: string;
			subtitle: string;
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		reason: I18nRemoveReason;
	};
	type: {
		title: string;
		subtitle: string;
		fields: {
			trusteeType: {
				labels: {
					memberNominated: string;
					employerAppointed: string;
					regulatorAppointed: string;
					other: string;
				};
			};
			isProfessionalTrustee: {
				labels: {
					isProfessionalTrusteeYes: string;
					isProfessionalTrusteeNo: string;
				};
			};
		};
		breadcrumbs: {
			link1: string;
			link2: string;
		};
	};
};
