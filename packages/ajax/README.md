<h1 align="center">
  Ajax Network Layer
</h1>
<p align="center" style="font-size: 1.2rem;">Helps to keep track of data statuses and efficiently reuse data that has already been fetched.</p>
<hr />

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
  - [Usage of AjaxProvider to initialize the App](#usage-of-ajaxprovider-to-initialize-the-app)
  - [Usage of AjaxQuery](#usage-of-ajaxquery)
- [AjaxProvider Props](#ajaxprovider-props)
  - [children](#children)
  - [api](#api)
  - [stores](#stores)
  - [initialState](#initialstate)
  - [persistKey](#persistkey)
- [AjaxQuery Props](#ajaxquery-props)
  - [endpoint](#endpoint)
  - [type](#type)
  - [headers](#headers)
  - [variables](#variables)
  - [store](#store)
  - [dataPath](#datapath)
  - [errorPath](#errorpath)
  - [mergeData](#mergedata)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][https://www.npmjs.com] which is bundled with [node][https://nodejs.org] and
should be installed as one of your project's `dependencies`:

```
npm i @tpr/ajax
```

> This package also depends on react, react-dom, xstate and @xstate/react. Please make sure you have it installed as well.

## Usage

> NOTE: AjaxProvider component will not provide any styles, only the functionality.

### Usage of AjaxProvider to initialize the App

```js
const App = () => {
	return (
		<AjaxProvider
			api={[{ name: 'registry', instance: fetch }]}
			stores={[{ name: 'trustees' }]}
		>
			{...JSX}
		</AjaxProvider>
	);
};
```

### Usage of AjaxQuery

```js
const ListOfTrustees = () => {
	return (
		<AjaxQuery
			endpoint="users"
			store="trustees"
			variables={{
				page: 1,
				total: 10,
				sort: {
					firstName: 'asc',
				},
			}}
		>
			{(...dataUtilities) => ...jsx}
		</AjaxQuery>
	);
};
```

## AjaxProvider Props

### children

> `JSX.Element` _required_

### api

> `Endpoint[]` _required_

Accepts objects of type `Endpoint`, at least one is required. First `Endpoint` will be the default.

```
Endpoint = {
	name: string;
	instance: Observable
}
```

### stores

> `Store[]` _required_

Accepts a configuration of stores where the data will be persisted.

```
Store = {
	name: string;
	persist?: boolean
}
```

### initialState

> `{}` _optional_

Use initialState to rehydrate the store from the `localStorage`

### persistKey

> `string`: _optional_

If store is persisted, it will be persisted on this key in the `localStorage`

## AjaxQuery Props

### endpoint

> `string | Request[]` _required_

### type

> `'get' | 'post'` _optional_

### headers

> `object` _optional_

### variables

> `object` _optional_

### store

> `string` _required_

Store name from the global store object that was defined in the Provider.

### dataPath

> 'string[]' _optional_

Define path to the data that comes back from the network request to be extracted.

### errorPath

> 'string[]' _optional_

Define path to the error that comes back from the server from network request.

### mergeData

> `(first: any, second: any) => [...first, ...second]` _optional_

Provide a method to merge data for `fetchMore` function
