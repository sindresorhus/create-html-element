import {type MergeExclusive} from 'type-fest';
import stringifyAttributes, {type HTMLAttributes} from 'stringify-attributes';

export type BaseOptions = {
	/**
	HTML tag attributes.
	*/
	readonly attributes?: HTMLAttributes;

	/**
	HTML tag name.

	@default 'div'
	*/
	readonly name?: string;
};

export type HtmlOptions = {
	/**
	HTML tag value in unescaped HTML.
	*/
	readonly html?: string;
};

export type TextOptions = {
	/**
	HTML tag value in escaped HTML.
	*/
	readonly text?: string;
};

export type ChildrenOptions = {
	/**
	HTML tag children.

	Strings are escaped, objects are passed to `createHtmlElement`.

	This option is mutually exclusive with the `html` and `text` options.

	@example
	```
	import createHtmlElement from 'create-html-element';

	createHtmlElement({
		name: 'div',
		children: [
			'<unsafe>',
			{
				name: 'iframe',
				attributes: {
					src: 'https://example.com'
				}
			},
			{
				name: 'span',
				text: 'Label here <em>plz</em>'
			}
		]
	});
	//=> '<div>&lt;unsafe&gt;<iframe src="https://example.com"></iframe><span>Label here &lt;em&gt;plz&lt;/em&gt;</span></div>'
	```
	*/
	readonly children?: readonly Child[];
};

export type Child = string | (Options & {readonly length?: never});

export type Options = BaseOptions & MergeExclusive<HtmlOptions, MergeExclusive<TextOptions, ChildrenOptions>>;

/**
Create a HTML element string.

@example
```
import createHtmlElement from 'create-html-element';

createHtmlElement({
	name: 'h1',
	attributes: {
		class: 'unicorn',
		rainbow: true,
		horse: false,
		number: 1,
		multiple: [
			'a',
			'b'
		]
	},
	html: '🦄'
});
//=> '<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>'

createHtmlElement({text: 'Hello <em>World</em>'});
//=> '<div>Hello &lt;em&gt;World&lt;/em&gt;</div>'

createHtmlElement({
	name: 'div',
	children: [
		'<unsafe>',
		{
			name: 'iframe',
			attributes: {
				src: 'https://example.com'
			}
		},
		{
			name: 'span',
			text: 'Label here <em>plz</em>'
		}
	]
});
//=> '<div>&lt;unsafe&gt;<iframe src="https://example.com"></iframe><span>Label here &lt;em&gt;plz&lt;/em&gt;</span></div>'
```
*/
export default function createHtmlElement(options?: Options): string;

export {HTMLAttributes} from 'stringify-attributes';
