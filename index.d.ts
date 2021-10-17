import {MergeExclusive} from 'type-fest';
import stringifyAttributes, {HTMLAttributes} from 'stringify-attributes';

export interface BaseOptions {
	/**
	HTML tag attributes.
	*/
	readonly attributes?: HTMLAttributes;

	/**
	HTML tag name.

	@default 'div'
	*/
	readonly name?: string;
}

export interface HtmlOptions {
	/**
	HTML tag value in unescaped HTML.
	*/
	readonly html?: string;
}

export interface TextOptions {
	/**
	HTML tag value in escaped HTML.
	*/
	readonly text?: string;
}

export type Options = BaseOptions & MergeExclusive<HtmlOptions, TextOptions>;

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
```
*/
export default function createHtmlElement(options?: Options): string;

export {HTMLAttributes} from 'stringify-attributes';
