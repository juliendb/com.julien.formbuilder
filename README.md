#Formbuilder widget

Formbuilder is a widget titanium that construct and configure forms with validation of differents fields.

Use ```underscorejs``` ```momentjs```

## Overview
- [Features](#features)
- [Working Example](#working-example)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Customization](#customization)
- [Methods & Parameters](#methodology)
- [Changelog](#changelog)

## Features


## Working Example
![Imgur](http://i.imgur.com/xuUFdQE.png)
* [Download the Working Example](https://github.com/MattMcFarland/TitaniumAlloy-FontAwesome-Example) to see it in action - but its so easy to use you probably won't have to.

## Quick Start
* [Download the latest version](https://github.com/mattmcfarland/com.mattmcfarland.fontawesome) of the widget as a ZIP file.
* Unzip the folder to your project under `app/widgets/com.mattmcfarland.fontawesome`.
* **ANDROID:** Copy `fontAwesome.ttf` from `com.mattmcfarland.fontawesome/assets/fonts` to `app/assets/fonts`
* Add the widget as a dependency to your `app/config.json` file:

```javascript
"dependencies": {
    "com.julien.formbuilder": "1.0.0"
}
```

### Titanium

```javascript
var form = Alloy.createWidget("com.julien.formbuilder", {
    fields: [
        {
            name: "firstname",
            type: "textfield",
            title: "Username",
            rules: "min_length[4]|max_length[50]",
            required: true,
        },
        {
            name: "password",
            type: "password",
            title: "Password",
            validator: "min_length[8]|max_length[50]",
            required: true,
        }
    ],
    submit: {
        title: "submit",
        callback: function(rows) {
        }
    }
});

win.add(form.getView());
```

### Alloy and Titanium

```xml
<Alloy>
    <Window>
        <Widget src="com.julien.formbuilder" id="form" />
    </Window>
</Alloy>
```

```javascript
$.form.setFields([
    {
        name: "firstname",
        type: "textfield",
        title: "Username",
        rules: "min_length[4]|max_length[50]",
        required: true,
    },
    {
        name: "password",
        type: "password",
        title: "Password",
        validator: "min_length[8]|max_length[50]",
        required: true,
    }
]);

$.form.setSubmit({
    title: "submit",
    callback: function(rows) {
    }
});
```

## Customization

You can to modify the file ```widget.tss``` to change style of form
You can also modify the file ```lib/validator.js``` to add or change the formbuilder validation error messages with languages.


## Methods & Parameters

### Methods

* `setField` : [Object] assign field params
	* `name` : [String] name (id) of field
	* `title` : [String] title (Label if assign) of field, use also for errors messages
	* `label` : [Boolean] assign a label with value title, by default `true`
	* `hint` : [String] assign a placeholder for (TextField or TextArea)
	* `type` : [String] assign a type for field, see below the types
	* `rules` : [String] assign rules for validation form, seperate by `|`
	* `required` : [Boolean] assign automatically rules for validation form, see below the types
	* `defaultValue` : [Value] assign default value for field
	* `rows` :  [Array] assign list values for field (type `select`), exemple `["choice A", "choice B", "choice C"]`
	* `defaultDate` : [String] assign default date for field type (`date` or `time`) format english, exemple ("MM-DD-YYYY" or HH:mm:ss")
	* `formatDate` : [String] assign format date for field type `date`, by default `"DD-MM-YYYY"`
	* `formatTime` : [String] assign format date for field type `time`, by default `"HH:mm:ss"`
	* `properties` : [Object] assign style properties for field input (`TextField`, `TextArea`, `Switch`)
	* `propertiesLabel` : [Object] assign style properties for label
* `setTitle` : [Object] assign title group params
	* `title` : [String] assign label title group
	* `properties` : [Object] assign style properties label title group
* `setSubmit` : [Object] assign button submit
	* `title` : [String] assign title of button submit
	* `properties` : [Object] assign style properties of button
	* `callback` : [Function] assign function return rows validation form
* `setFields` : [Array] assign multiples fields
	* `title` : [String] if option group is not empty then assign a label title group
	* `properties` : [Object] if option group is not empty then assign style properties label title group
	* `group` : [Object] assign group fields
	* if there don't have option group each key is params field
* `setError` : [Object] set error by field name
	* `name` : [String] name of field
	* `title` : [String] text for error
	* `show` : [Boolean] show error, by default false
* `getField` : return field object
	* [String] name of field
* `getInput` : return input view 
	* [String] name of field
* `getError` : return error label
	* [String] name of field
* `getSubmit` : return submit view
* `clearForm` : clear form


### Types

* `textfield` [TextField] default
* `textarea` [TextArea]
* `switch` [Switch]
* `select` [TextField + Picker]
* `password` [TextField]
* `email` [TextField]
* `phone` [TextField]
* `number` [TextField]
* `integer` [TextField]
* `date` [TextField + DatePicker]
* `time` [TextField + TimePicker]
* `url` [TextField]


### Rules

* `contain` : The field `title` must contain `value`.
* `not_contain` : The field `title` must not contain `value`.
* `equal_to` : The field `title` must be strictly equal to `value`.
* `diff_to` : The field `title` must be different to `value`.
* `alpha` : The field `title` should only contain letters.
* `alpha_numeric` : The field `title` should only contain letters and numbers.
* `min_length` : The field `title` must be at least `value` characters long.
* `max_length` : The field `title` must be less than `value` characters.
* `isset` : The field `title` must not be empty.
* `exact_field` : The field `title` must be strictly equal to the field `field`.
* `diff_field` : The field `title` must be different from the field `field`.
* `integer` : The field `title` must contain a number integer.
* `number` : The field `title` must contain a number.
* `bigger_than` : The field `title` must be bigger than `value`.
* `smaller_than` : The field `title` must be smaller than `value`.
* `bigger_equal_than` : The field `title` must be bigger or equal than `value`.
* `smaller_equal_than` : The field `title` must be smaller or equal than `value`.
* `email` : The field `title` must be an e-mail adddress.
* `phone` : The field `title` must be a phone number.
* `url` : The field `title` must be an url adddress.
* `accept` : The field `title` must be checked.

if the option `required` is true, this fields have already rules to which may be added others.

`email` : "isset|email"
`phone` : "isset|phone"
`number` : "isset|number"
`integer` : "isset|integer"
`url` : "isset|url"
`switch ; "accept"
`defaut` : "isset"


### Parameters

* `lang` : changes languages for validation errors messages `en` or `fr`, by default `en`
* `title` : set title like `setTitle();`
* `field` : set field like `setField();`
* `fields` : set fields like `setFields();`
* `submit` : set submit like `setSubmit();`
* `width` : width of form
* `height` : height of form
* `height` : height of form
* `top` : position top of form
* `left` : position left of form
* `right` : position right of form
* `bottom` : position bottom of form


## Changelog

* 1.0: Initial commit
