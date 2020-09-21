import { I18nRemoveReason } from '../interfaces';

export type IndependentTrusteeI18nProps = {
	preview: {
		buttons: {
			one: string;
			two: string;
			three: string;
			four: string;
		};
		checkboxLabel: string;
		trusteeType: string;
	};
	regulator: {
		title: string;
		subtitle: string;
		fields: {
			appointedByRegulator: {
				labels: {
					isAppointedByRegulatorYes: string;
					isAppointedByRegulatorNo: string;
				};
			};
		};
	};
	remove: {
		confirm: {
			title: string;
			subtitle: string;
			breadcrumbs: {
				link1: string;
				link2: string;
			};
			dialog: {
				message1: string;
			};
			buttons: {
				remove: string;
				cancel: string;
			};
		};
		reason: I18nRemoveReason;
	};
};
