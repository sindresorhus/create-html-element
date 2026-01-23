import stringifyAttributes from 'stringify-attributes';
import {voidHtmlTags as voidHtmlTagsArray} from 'html-tags';
import {htmlEscape} from 'escape-goat';

const voidHtmlTags = new Set(voidHtmlTagsArray);

export default function createHtmlElement(
	{
		name = 'div',
		attributes = {},
		html,
		text,
		children,
	} = {},
) {
	const hasHtml = html !== undefined;
	const hasText = text !== undefined;
	const hasChildren = children !== undefined;

	if ([hasHtml, hasText, hasChildren].filter(Boolean).length > 1) {
		throw new Error('The `html`, `text`, and `children` options are mutually exclusive');
	}

	if (hasChildren && !Array.isArray(children)) {
		throw new TypeError('The `children` option must be an array');
	}

	let content = '';

	if (hasChildren) {
		content = children.map(child => {
			if (typeof child === 'string') {
				return htmlEscape(child);
			}

			if (typeof child === 'object' && child !== null && !Array.isArray(child)) {
				return createHtmlElement(child);
			}

			throw new TypeError('Children must be strings or objects');
		}).join('');
	} else if (hasText) {
		content = htmlEscape(text);
	} else if (hasHtml) {
		content = html;
	}

	let result = `<${name}${stringifyAttributes(attributes)}>`;

	if (!voidHtmlTags.has(name)) {
		result += `${content}</${name}>`;
	}

	return result;
}
