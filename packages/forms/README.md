# @tpr/forms [![npm version](https://flat.badgen.net/npm/v/@tpr/forms)](https://www.npmjs.com/package/@tpr/forms)

Form components for TPR apps.

## Installation

```sh
npm install @tpr/forms

# Peer Dependencies - Also Required
npm install react react-dom @tpr/core @tpr/icons @tpr/theming
```

## Helpers

- `validate: (fields: FieldProps[]) => (formValues) => errors object`: validate function helper for `react-final-form` Form component.
- `renderFields: (fields: FieldProps[]) => ReactElement[]`: renders a vertical list of fields from the fields array. Has to be used as a child of Form component.

## Components

- AddressLookup
- Checkbox
- Currency
- Date
- Email
- Hidden input
- Input
- Number
- Phone
- Radio
- Select
- Text
