'use strict';
const stringifyAttributes = require('stringify-attributes');
const htmlTags = require('html-tags/void');
const escapeGoat = require('escape-goat');

const voidHtmlTags = new Set(htmlTags);

module.exports = options => {
	options = Object.assign({
		name: 'div',
		attributes: {},
		html: ''
	}, options);

	const content = options.text ? escapeGoat.escape(options.text) : options.html;
	let ret = `<${options.name}${stringifyAttributes(options.attributes)}>`;

	if (!voidHtmlTags.has(options.name)) {
		ret += `${content}</${options.name}>`;
	}

	return ret;
};
