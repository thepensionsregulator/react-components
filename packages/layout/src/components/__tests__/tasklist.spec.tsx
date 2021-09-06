import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Tasklist, useCalculateProgress } from '../tasklist/tasklist';
import { TasklistSectionProps } from '../tasklist/components/types';
import { axe } from 'jest-axe';

const s1: TasklistSectionProps = {
	title: 'Scheme details',
	links: [
		{
			name: 'Scheme name and address',
			completed: true,
			onClick: (link) => alert(`You clicked on ${link.path}`),
			path: '/scheme-name-and-address',
		},
		{
			name: 'Scheme status and membership',
			onClick: (link) => alert(`You clicked on ${link.path}`),
			path: '/scheme-status-and-membership',
		},
		{
			name: 'Consent to electronic communication',
			onClick: (link) => alert(`You clicked on ${link.path}`),
			path: '/consent-to-electronic-communication',
		},
	],
	order: 1,
};
const s2: TasklistSectionProps = {
	title: 'Roles',
	links: [
		{
			name: 'Trustee details',
			completed: true,
			active: () => true,
			path: '/trustee-details',
		},
		{ name: 'Employer details', path: '/employer-details' },
		{
			name: 'Service provider details',
			path: '/service-provider-details',
		},
		{
			name: 'Named contact details',
			completed: true,
			path: '/name-contact-details',
		},
	],
	order: 2,
};
const s3: TasklistSectionProps = {
	title: 'Finish up',
	links: [
		{
			name: 'Review and submit',
			completed: false,
			disabled: true,
			path: '/review-and-submit',
			hideIcon: true,
		},
	],
	order: 3,
};

const sections = [s1, s2, s3];

describe('Tasklist', () => {
	test('is accessible', async () => {
		const title = 'Scheme return home';
		const { container } = getComponent(title);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('renders main header title', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);
		expect(getByText(title)).toBeInTheDocument();
		expect(true).toBeTruthy();
	});

	test('calculates and displays progress correctly', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		const progressText = getByText((content) =>
			content.startsWith('You have completed'),
		);
		const [currentProgress, totalProgress] = progressText.textContent
			.split(' ')
			.map((value) => parseInt(value))
			.filter(Boolean);

		const { result } = renderHook(() => useCalculateProgress(sections));
		const [totalSections, totalCompleted] = result.current;

		expect(currentProgress).toEqual(totalCompleted.length);
		expect(totalProgress).toEqual(totalSections.length);
	});

	test('each section title is visible', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[s1.title, s2.title, s3.title].forEach((t) => {
			expect(getByText(t)).toBeInTheDocument();
		});
	});

	test('each section link name is visible', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[...s1.links, ...s2.links, ...s3.links].forEach((link) => {
			expect(getByText(link.name)).toBeInTheDocument();
		});
	});

	test('useCalculateProgress calculates values as expected', () => {
		const { result } = renderHook(() => useCalculateProgress(sections));
		const [totalSections, totalCompleted] = result.current;

		expect(totalCompleted.length).toBe(3);
		expect(totalSections.length).toBe(7);
	});

	test('incomplete link is linked', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[...s1.links, ...s2.links, ...s3.links]
			.filter((link) => !link.completed && !link.disabled)
			.forEach((link) => {
				expect(getByText(link.name).closest('a')).not.toBeNull();
			});
	});

	test('completed link is linked', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[...s1.links, ...s2.links, ...s3.links]
			.filter((link) => link.completed && !link.disabled)
			.forEach((link) => {
				expect(getByText(link.name).closest('a')).not.toBeNull();
			});
	});

	test('disabled link is not linked', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[...s1.links, ...s2.links, ...s3.links]
			.filter((link) => link.disabled)
			.forEach((link) => {
				expect(getByText(link.name).closest('a')).toBeNull();
			});
	});

	test('status is labelled correctly', () => {
		const title = 'Scheme return home';
		const { getByText } = getComponent(title);

		[...s1.links, ...s2.links, ...s3.links].forEach((link) => {
			if (link.hideIcon) {
				const status = getByText(link.name).nextElementSibling;
				expect(status).toBeNull();
			} else {
				let expectedStatus = 'Section not complete';
				let expectedClass = 'incomplete';
				if (link.completed) {
					expectedStatus = 'Section complete';
					expectedClass = 'complete';
				}
				if (link.disabled) {
					expectedStatus = 'Section unavailable';
					expectedClass = 'disabled';
				}

				const status = getByText(link.name).nextElementSibling;
				expect(status.textContent).toBe(expectedStatus);
				expect(status).toHaveAttribute('class', `taskStatus ${expectedClass}`);
			}
		});
	});

	const getComponent = (title: string) => {
		const { container, getByText } = render(
			<Tasklist
				titleComplete={title}
				titleIncomplete={title}
				reviewTitle="Review page"
				welcomeTitle="Welcome page"
				reviewPath="/"
				welcomePath="/"
				sections={sections}
				matchPath={() => {
					/*intentional*/
				}}
				location={{}}
				history={{
					push: () => {
						/*intentional*/
					},
				}}
				sectionDisabledLabel="Section unavailable"
				sectionCompleteLabel="Section complete"
				sectionIncompleteLabel="Section not complete"
			/>,
		);
		return { container, getByText };
	};
});
