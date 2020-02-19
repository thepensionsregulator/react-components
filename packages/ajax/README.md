<h1 align="center">
  Ajax Network Layer
</h1>
<p align="center" style="font-size: 1.2rem;">Helps to keep track of data statuses and efficiently reuse data that has already been fetched.</p>
<hr />

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Features

- Transport and protocol agnostic data fetching
- Request deduplication
- Local mutation
- Pagination
- TypeScript ready
- Network status
- Refetch queries upon successful mutation

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [`AjaxProvider` Props](#ajaxprovider-props)
  - [children](#children)
  - [api](#api)
  - [stores](#stores)
  - [initialState](#initialstate)
  - [persistOn](#persiston)
- [AjaxQuery Props](#ajaxquery-props)
  - [endpoint](#endpoint)
  - [type](#type)
  - [headers](#headers)
  - [variables](#variables)
  - [store](#store)
  - [dataPath](#datapath)
  - [errorPath](#errorpath)
  - [mergeData](#mergedata)
- [`AjaxQuery` Render Props](#ajaxquery-render-props)
- [`AjaxMutation` Props](#ajaxmutation-props)
- [`AjaxMutation` Render Props](#ajaxmutation-render-props)
- [`useUpdate` Hook](#useupdate-hook)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm](https://www.npmjs.com) which is bundled with [node](https://nodejs.org) and
should be installed as one of your project's `dependencies`:

```
npm i @tpr/ajax
```

> This package also depends on react and react-dom. Please make sure you have those installed as well.

## Testing

Run following command from the root of the project and follow the instructions.

```
yarn test:watch
```

## `AjaxProvider` Props

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

### persistOn

> `string`: _optional_

If store is persisted, it will be persisted on this key in the `localStorage`

## AjaxQuery, useQuery Props

### endpoint

> `string` _required_

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

## `AjaxQuery, useQuery` Render Props

TODO: ...

## `AjaxMutation, useMutation` Props

TODO: ...

## `AjaxMutation, useMutation` Render Props

TODO: ...

## `useUpdate` Props

This hook provides a way to interact with one of available stores. Can be used for optimistic updates or update the state whenever it is appropriate todo so.

> `useUpdate(args: UpdateProps): (search?: string | null, options: FindAndModifyProps) => void`

## Examples

> NOTE: all examples will be hosted on the codesandbox

- useQuery
- useMutation
- useUpdate
