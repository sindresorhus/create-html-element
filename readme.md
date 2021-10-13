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

This option is mutually exclusive with the `text` option.

##### text

HTML tag value in escaped HTML.

This option is mutually exclusive with the `html` option.

## Related

- [stringify-attributes](https://github.com/sindresorhus/stringify-attributes) - Turn an object into a string of HTML attributes
