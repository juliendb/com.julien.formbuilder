/*
 * isset
 * exact_field["something"]
 * diff_field["something"]
 * contain["something"]
 * not_contain["something"]
 * accept
 * url
 * email
 * phone
 * alpha
 * alpha_numeric
 * integer
 * number
 * min_length[4]
 * max_length[50]
 * diff_to[10]
 * equal_to[10]
 * bigger_than[4]
 * smaller_than[50]
 */

module.exports = {
	contain: {
		rule: function(value, param) {
			return value.match(param) !== null;
		},
		fr: "Le champ \"%title%\" doit contenir %s%.",
		en: "The field \"%title%\" must contain %s%."
	},
	not_contain: {
		rule: function(value, param) {
			return value.match(param) === null;
		},
		fr: "Le champ \"%title%\" ne doit pas contenir %s%.",
		en: "The field \"%title%\" must not contain %s%."
	},
	equal_to: {
		rule: function(value, param) {
			return _.isEqual(value, param);
		},
		fr: "Le champ \"%title%\" doit être strictement égale à %s%.",
		en: "The field \"%title%\" must be strictly equal to %s%."
	},
	diff_to: {
		rule: function(value, param) {
			return !_.isEqual(value, param);
		},
		fr: "Le champ \"%title%\" doit être différent de %s%.",
		en: "The field \"%title%\" must be different to %s%."
	},
	alpha: {
		rule: function(value) {
			return /^[a-z\-_\s]+$/i.test(value);
		},
		fr: "Le champ \"%title%\" ne doit contenir que des lettres.",
		en: "The field \"%title%\" should only contain letters."
	},
	alpha_numeric: {
		rule: function(value) {
			return /^[a-z\d\-_\s]+$/i.test(value);
		},
		fr: "Le champ \"%title%\" ne doit contenir que des lettres et des nombres.",
		en: "The field \"%title%\" should only contain letters and numbers."
	},
	min_length: {
		rule: function(value, length) {
			return value.length >= eval(length);
		},
		fr: "Le champ \"%title%\" doit avoir au moins %s% caractères.",
		en: "The field \"%title%\" must be at least %s% characters long."
	},
	max_length: {
		rule: function(value, length) {
			return value.length > 0 && value.length <= eval(length);
		},
		fr: "Le champ \"%title%\" doit avoir moins de %s% caractères.",
		en: "The field \"%title%\" must be less than %s% characters."
	},
	isset: {
		rule: function(value) {
			return /([^\s])/.test(value);
		},
		fr: "Le champ \"%title%\" ne doit pas être vide.",
		en: "The field \"%title%\" must not be empty."
	},
	exact_field: {
		rule: function(value, param) {
			return value === $.getInput(param).value;
		},
		fr: "Le champ \"%title%\" doit être strictement égale au champ \"%s%\".",
		en: "The field \"%title%\" must be strictly equal to the field \"%s%\"."
	},
	diff_field: {
		rule: function(value, param) {
			return value !== $.getInput(param).value;
		},
		fr: "Le champ \"%title%\" doit être différent du champ \"%s%\".",
		en: "The field \"%title%\" must be different from the field \"%s%\"."
	},
	integer: {
		rule: function(value) {
			return /^\d+$/.test(value);
		},
		fr: "Le champ \"%title%\" doit contenir un nombre entier.",
		en: "The field \"%title%\" must contain a number integer."
	},
	number: {
		rule: function(value) {
			return /^\-?[0-9]*\.?[0-9]+$/.test(value);
		},
		fr: "Le champ \"%title%\" doit contenir un nombre.",
		en: "The field \"%title%\" must contain a number."
	},
	bigger_than: {
		rule: function(value, param) {
			return eval(value) > eval(param);
		},
		fr: "Le champ \"%title%\" doit être plus grand que %s%.",
		en: "The field \"%title%\" must be bigger than %s%."
	},
	smaller_than: {
		rule: function(value, param) {
			return eval(value) < eval(param);
		},
		fr: "Le champ \"%title%\" doit être plus petit que %s%.",
		en: "The field \"%title%\" must be smaller than %s%."
	},
	bigger_equal_than: {
		rule: function(value, param) {
			return eval(value) >= eval(param);
		},
		fr: "Le champ \"%title%\" doit être plus grand ou égale que %s%.",
		en: "The field \"%title%\" must be bigger or equal than %s%."
	},
	smaller_equal_than: {
		rule: function(value, param) {
			return eval(value) <= eval(param);
		},
		fr: "Le champ \"%title%\" doit être plus petit ou égale que %s%.",
		en: "The field \"%title%\" must be smaller or equal than %s%."
	},
	email: {
		rule: function(value) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(value);
		},
		fr: "Le champ \"%title%\" doit être une adresse e-mail.",
		en: "The field \"%title%\" must be an e-mail adddress."
	},
	phone: {
		rule: function(value) {
			var re = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;
			return re.test(value);
		},
		fr: "Le champ \"%title%\" doit être un numéro de téléphone.",
		en: "The field \"%title%\" must be a phone number."
	},
	url: {
		rule: function(value) {
			var re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
			return re.test(value);
		},
		fr: "Le champ \"%title%\" doit être une adresse url.",
		en: "The field \"%title%\" must be an url adddress."
	},
	accept: {
		rule: function(value) {
			return value === true;
		},
		fr: "Le champ \"%title%\" doit être coché.",
		en: "The field \"%title%\" must be checked."
	}
};