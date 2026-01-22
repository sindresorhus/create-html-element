# create-html-element

> Create a HTML element string

## Install

```sh
npm install create-html-element
```

## Usage

```js
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

## API

### createHtmlElement(options)

#### options

Type: `object`

##### name

Type: `string`\
Default: `'div'`

HTML tag name.

##### attributes

Type: `object`

HTML tag attributes.

##### html

HTML tag value in unescaped HTML.

This option is mutually exclusive with the `text` and `children` options.

##### text

HTML tag value in escaped HTML.

This option is mutually exclusive with the `html` and `children` options.

##### children

Type: `Array<string|object>`

HTML tag children.

Strings are escaped, objects are passed to `createHtmlElement`.

This option is mutually exclusive with the `html` and `text` options.

```js
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

## Related

- [stringify-attributes](https://github.com/sindresorhus/stringify-attributes) - Turn an object into a string of HTML attributes
