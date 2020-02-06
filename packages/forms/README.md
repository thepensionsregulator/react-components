# `@tpr/forms`

Forms will adapt react-final-forms library and will expose helper functions to simplify form components delivery.

## Form Functions

### ✅ validate()

```ts
validate(formFields: FieldProps[]) => (formValues) => errors object
```

### ✅ renderFields()

```ts
renderFields(fields: FieldProps[]): ReactElement
```

## Form Components

### ✅ Text

- should have a label
- label should have a state if it is an optional input
- should take custom validation function
- should have a 100% or custom width option

### ✅ Radio Buttons Group

- if 2 options than should display as row list
- if 3 or more options should display in column list
- config to be able to select a number of options

### ✅ Checkbox

### ✅ Select + Search

- should have a dropdown with ability to select a single option
- shoult take onSelect handler

### ✅ Textarea

- should have max length prop
- should show chars left when typing
