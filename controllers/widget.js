/*
 * textfield
 * textarea
 * password
 * integer
 * select
 * switch
 * number
 * email
 * phone
 * date
 * time
 * url
 */



var args = arguments[0] || {};


var moment = require("alloy/moment");

var validator = require(WPATH('validator'));



$.clearForm = clearForm;

$.getInput = getInput;
$.getField = getField;
$.getError = getError;
$.getSubmit = getSubmit;

$.setTitle = setTitle;
$.setField = setField;
$.setFields = setFields;
$.setSubmit = setSubmit;

$.setError = setError;
$.setErrors = setErrors;
$.hasErrors = hasErrors;

$.submitFields = submitFields;


$.fields_map = {};
$.errors_map = {};
$.submit = null;
$.lang = "en";





initForm();

function initForm() {
	if (args.lang) $.lang = args.lang || "en";

	if (args.title) $.setTitle(args.title);
	if (args.field) $.setField(args.field);
	if (args.fields) $.setFields(args.fields);
	if (args.submit) $.setSubmit(args.submit);

	if (args.top) $.formScrollView.top = args.top;
	if (args.left) $.formScrollView.left = args.left;
	if (args.right) $.formScrollView.right = args.right;
	if (args.bottom) $.formScrollView.bottom = args.bottom;
	if (args.width) $.formScrollView.width = args.width;
	if (args.height) $.formScrollView.height = args.height;
}




function clearForm() {
	$.fields_map = {};
	$.errors_map = {};
	$.submit = null;

	$.formView.removeAllChildren();
	$.formSubmit.removeAllChildren();
}




function getInput(name) {
	return $.fields_map[name]["input"];
}


function getField(name) {
	return $.fields_map[name]["field"];
}


function getError(name) {
	return $.fields_map[name]["error"];
}



function getSubmit() {
	return $.submit;	
}




function setField(field) {
	_.defaults(field, {
		name: 				"",
		hint: 				"",
		title: 				"",
		rules: 				"",
		defaultDate: 		"",
		defaultValue: 		"",
		type:  				"textfield",
		formatTime:			"HH:mm:ss",
		formatDate: 		"MM-DD-YYYY",
		label: 				true,
		editable: 			true,
		required: 			false,
		passwordMask: 		false,
		properties: 		{},
		propertiesLabel: 	{},
		rows: 				[],
	});


	var child = "formTextField";


	switch (field.type) {
		case "textarea" :
			child = "formTextArea";
			break;


		case "password" :
			field.passwordMask = true;
			break;

		case "phone" :
			field.keyboardType = Ti.UI.KEYBOARD_PHONE_PAD;
			break;

		case "email" :
			field.keyboardType = Ti.UI.KEYBOARD_EMAIL;
			break;

		case "url" :
			field.keyboardType = Ti.KEYBOARD_URL;
			break;

		case "date" :
		case "time" :
		case "select" :
			field.editable = false;
			break


		case "switch" :
			child = "formSwitch";
			break;


		default :
			child = "formTextField";
			field.keyboardType = Ti.UI.KEYBOARD_DEFAULT;
	}


	var formGroup = $.UI.create('View', {classes: ["form-group"]});
	var formError = $.UI.create('Label', {classes: ["form-error"]});
	var formControl = $.UI.create('View', {classes: ["form-control"]});

	var formLabel = getFormTemplate("formLabel", field)
	checkProperties(formLabel, field.propertiesLabel);

	var formInput = getFormTemplate(child, field);
	checkProperties(formInput, field.properties);



	if (field.type == "switch") {
		if (field.label == true) {
			formGroup.add(formLabel);
		}

		formGroup.add(formInput);
		formGroup.add(formError);

	} else {
		formControl.add(formInput);

		if (field.label == true) {
			formGroup.add(formLabel);
		}

		formGroup.add(formControl);
		formGroup.add(formError);
	}

	
	// fields map
	$.fields_map[field.name] = {
		field: field,
		input: formInput,
		error: formError
	};



	$.formView.add(formGroup);
}



function setTitle(field) {
	_.defaults(field, {
		title: "",
		properties: {}
	});


	var formGroup = $.UI.create('View', {classes: ["form-group"]});
	var formTitle = getFormTemplate('formTitle', field);
	checkProperties(formTitle, field.properties);
	formGroup.add(formTitle);


	$.formView.add(formGroup);
}



function setFields(fields) {
	_.each(fields, function(field) {
		if (field.group !== undefined) {
			$.setTitle(field);

			_.each(field.group, function(subfield) {
				$.setField(subfield);
			});
		
		} else {

			$.setField(field);
		}
	});
}



function setSubmit(field) {
	if ($.submit == null) {
		_.defaults(field, {
			title: "submit",
			properties: {}
		});


		var formGroup = $.UI.create('View', {classes: ["form-group"]});
		var formSubmit = getFormTemplate("formSubmit", field);
		checkProperties(formSubmit, field.properties);

		
		formSubmit.addEventListener("click", function() {
			var rows = $.submitFields(rows);
			if (rows) field.callback(rows);
		});

		formGroup.add(formSubmit);
		$.formSubmit.add(formGroup);


		$.submit = formSubmit;
	}
}




function setError(def) {
	var error = $.getError(def.name);

	if (def.show) {
		error.height = Ti.UI.SIZE;
		error.text = def.title;
		error.opacity = 1;

	} else {
		error.height = 0;
		error.opacity = 0;
		error.text = "";
	}
}



function setErrors() {
	if ($.hasErrors()) {
		_.each($.errors_map, function(error_map) {
			$.setError(error_map);
		});
	}
}



function hasErrors() {
	return !_.isEmpty($.errors_map);
}




function submitFields(calback) {
	if (!_.isEmpty($.fields_map)) {
		$.errors_map = {};
		rows = {};


		_.each($.fields_map, function(field_map, name) {
			var input = field_map.input;
			var error = field_map.error;
			var field = field_map.field;
			var current = input.value;
			var rules = "";


			// reset error
			setError({name: name});


			// push rows
			rows[name] = input.value;


			if (field.required) {
				if (field.type == "number") {
					rules = "isset|number";

				} else if (field.type == "integer") {
					rules = "isset|integer";

				} else if (field.type == "phone") {
					rules = "isset|phone";

				} else if (field.type == "email") {
					rules = "isset|email";

				} else if (field.type == "url") {
					rules = "isset|url";

				} else if (field.type == "switch") {
					rules = "accept";
				
				} else {
					rules = "isset";
				}
				

				if (_.has(field, "rules") && !_.isEmpty(field.rules)) {
					rules += "|"+field.rules;
				}

			} else {

				if (_.has(field, "rules")) {
					rules = field.rules;
				}
			}


			if (!_.isEmpty(rules) && !checkRules(field, current, rules)) {
				$.errors_map[name] = {
					name: name,
					show: true,
					title: field.errorTitle
				};
			}
		});



		// errors and validation
		if (!$.hasErrors()) {
			if (_.isFunction(calback)) {
				calback(rows);

			} else {
				return rows;
			}
		
		} else {
			$.setErrors();
		}
	};
}







function checkRules(field, current, rules) {
	var ruleRegex = /^(.+?)\[(.+)\]$/;
	var lang = $.lang;

	
	if (!_.isEmpty(rules) && _.isString(rules)) {
		rules = rules.split('|');
		for (var i = 0; i < rules.length; i++) {
			var method = rules[i];
			var params = null;
			var parts = ruleRegex.exec(rules[i]);
			

			if (parts != null) {
				method = parts[1];
				params = parts[2];
			}


			if (_.has(validator, method)) {
				if (!_.has(validator[method], lang)) lang = "en";

				field.errorTitle = validator[method][lang];
				field.errorTitle = field.errorTitle.replace('%title%', field.title);

				if (params != null) {
					if (method === "exact_field" || method === "diff_field") {
						field.errorTitle = field.errorTitle.replace('%s%', getField(params).title);

					} else {
						field.errorTitle = field.errorTitle.replace('%s%', params);
					}
				}


				if (!validator[method].rule(current, params)) {
					return false;
				}
			}
		}
	};

	return true;
}



function checkProperties(view, properties) {
	var omit = "id text title classes children";
	properties = _.omit(properties, omit.split(" "));

	view.applyProperties(properties);
}



function getFormTemplate(child, field) {
	switch(child) {
		case "formTitle" :
			return $.UI.create("Label", {
				classes: "form-title",
				text: field.title
			});
			break;


		case "formLabel" :
			return $.UI.create("Label", {
				classes: "form-label",
				text: field.title
			});
			break;


		case "formTextArea" :
			return $.UI.create("TextArea", {
				id: field.name,
				classes: "form-input",
				hintText: field.hint,
				editable: field.editable,
				value: field.defaultValue
			});
			break;


		case "formTextField" :
			var formInput = $.UI.create("TextField", {
				id: field.name,
				classes: "form-input",
				editable: field.editable,
				date: field.defaultDate,
				value: field.defaultValue,
				hintText: field.hint,
				keyboardType: field.keyboardType,
				passwordMask: field.passwordMask
			});


			formInput.addEventListener("touchstart", function(ev) {
				switch(field.type) {
					case "date" :
						var current = new Date();
						if (formInput.value != "" || formInput.date != "") {
							current = new Date( moment(formInput.date) );
						}

						var picker = Ti.UI.createPicker({
							type:Ti.UI.PICKER_TYPE_DATE,
						});
						picker.showDatePickerDialog({
							value: current,
							callback: function(e) {
								if (!e.cancel) {
									formInput.date = moment(e.value);
									formInput.value = moment(e.value).format(field.formatDate);
									formInput.blur();
								}
							}
						});
						break;


					case "time" :
						var current = new Date();
						if (formInput.value != "" || formInput.date != "") {
							current = new Date( moment(formInput.date) );
						}

						var picker = Ti.UI.createPicker({
							type: Ti.UI.PICKER_TYPE_TIME,
						});
						picker.showTimePickerDialog({
							value: current,
							callback: function(e) {
								if (!e.cancel) {
									formInput.date = moment(e.value);
									formInput.value = moment(e.value).format(field.formatTime);
									formInput.blur();
								}
							}
						});
						break;


					case "select" :
						var dialog = Ti.UI.createOptionDialog({
							title: field.title,
							options: field.rows,
							selectedIndex: field.rows.indexOf(formInput.value)
						});
						dialog.addEventListener("click", function(e) {
							if (field.rows[e.index] != undefined) {
								formInput.value = field.rows[e.index];
							}
						});
						dialog.show();
						break;
				}
			});


			return formInput;
			break;


		case "formSwitch" :
			if (!_.isBoolean(field.defaultValue)) {
				field.defaultValue = false;
			}

			return $.UI.create("Switch", {
				id: field.name,
				classes: "form-switch",
				value: field.defaultValue
			});
			break;


		case "formSubmit" :
			return $.UI.create("Button", {
				id: field.name,
				classes: "form-submit",
				title: field.title
			});
			break;
	}
}