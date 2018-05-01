# create-html-element [![Build Status](https://travis-ci.org/sindresorhus/create-html-element.svg?branch=master)](https://travis-ci.org/sindresorhus/create-html-element)

> Create a HTML element string


## Install

```
$ npm install create-html-element
```


## Usage

```js
const createHtmlElement = require('create-html-element');

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


## API

### createHtmlElement(options)

#### options

Type: `Object`

##### name

Type: `string`<br>
Default: `div`

HTML tag name.

##### attributes

Type: `Object`

HTML tag attributes.

##### html

HTML tag value in unescaped HTML. This option is mutually exclusive with the `text` option.

##### text

HTML tag value in escaped HTML. This option is mutually exclusive with the `html` option.


## Related

- [stringify-attributes](https://github.com/sindresorhus/stringify-attributes) - Turn an object into a string of HTML attributes


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
