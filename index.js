'use strict';
const stringifyAttributes = require('stringify-attributes');
const htmlTags = require('html-tags/void');

const voidHtmlTags = new Set(htmlTags);

module.exports = options => {
	options = Object.assign({
		name: 'div',
		attributes: {},
		value: '',
		selfClose: false
	}, options);

	let ret = `<${options.name}${stringifyAttributes(options.attributes)}`;

	if (!voidHtmlTags.has(options.name)) {
		ret += `${options.value}</${options.name}>`;
	} else if (options.selfClose) {
		ret += '/>';
	} else {
		ret += '>';
	}

	return ret;
};
