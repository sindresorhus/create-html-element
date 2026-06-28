import stringifyAttributes from 'stringify-attributes';
import {voidHtmlTags as voidHtmlTagsArray} from 'html-tags';
import {htmlEscape} from 'escape-goat';

const voidHtmlTags = new Set(voidHtmlTagsArray);

// Matches a valid HTML tag name (a letter followed by letters, digits, hyphens, underscores, or periods).
const tagNamePattern = /^[a-z][\w\-.]*$/iv;

export default function createHtmlElement({
	name = 'div',
	attributes = {},
	html,
	text,
	children,
} = {}) {
	if (!tagNamePattern.test(name)) {
		throw new Error(`Invalid tag name: ${JSON.stringify(name)}`);
	}

	const hasHtml = html !== undefined;
	const hasText = text !== undefined;
	const hasChildren = children !== undefined;

	if ([hasHtml, hasText, hasChildren].filter(Boolean).length > 1) {
		throw new Error('The `html`, `text`, and `children` options are mutually exclusive');
	}

	if (hasChildren && !Array.isArray(children)) {
		throw new TypeError('The `children` option must be an array');
	}

	const openingTag = `<${name}${stringifyAttributes(attributes)}>`;

	if (voidHtmlTags.has(name)) {
		return openingTag;
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

	return `${openingTag}${content}</${name}>`;
}
