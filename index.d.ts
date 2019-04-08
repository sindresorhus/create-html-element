import {MergeExclusive} from 'type-fest';

declare namespace createHtmlElement {
	interface BaseOptions {
		/**
		HTML tag attributes.
		*/
		attributes?: {[key: string]: string | boolean | number | string[]};

		/**
		HTML tag name.

		@default 'div'
		*/
		name?: string;
	}

	interface HtmlOptions {
		/**
		HTML tag value in unescaped HTML.
		*/
		html?: string;
	}

	interface TextOptions {
		/**
		HTML tag value in escaped HTML.
		*/
		text?: string;
	}

	type Options = BaseOptions & MergeExclusive<HtmlOptions, TextOptions>;
}

/**
Create a HTML element string.

@example
```
import createHtmlElement = require('create-html-element');

createHtmlElement({
	name: 'h1',
	attributes: {
		class: 'unicorn',
		rainbow: true,
		horse: false,
		number: 1,
		multiple: ['a', 'b']
	},
	html: '🦄'
});
//=> '<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>'

createHtmlElement({text: 'Hello <em>World</em>'});
//=> '<div>Hello &lt;em&gt;World&lt;/em&gt;</div>'
```
*/
declare function createHtmlElement(options?: createHtmlElement.Options): string;

export = createHtmlElement;
