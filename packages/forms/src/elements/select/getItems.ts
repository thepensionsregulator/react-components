import matchSorter from 'match-sorter';

export default function getItems(allItems: any[], filterValue: string) {
	return filterValue
		? matchSorter(allItems, filterValue, {
				keys: ['label'],
		  })
		: allItems;
}
