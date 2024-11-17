import stringifyAttributes from 'stringify-attributes';
import {voidHtmlTags as voidHtmlTagsArray} from 'html-tags';
import {htmlEscape} from 'escape-goat';

const voidHtmlTags = new Set(voidHtmlTagsArray);

export default function createHtmlElement(
	{
		name = 'div',
		attributes = {},
		html = '',
		text,
	} = {},
) {
	if (html && text) {
		throw new Error('The `html` and `text` options are mutually exclusive');
	}

	const content = text ? htmlEscape(text) : html;
	let result = `<${name}${stringifyAttributes(attributes)}>`;

	if (!voidHtmlTags.has(name)) {
		result += `${content}</${name}>`;
	}

	return result;
}
