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
	value: '🦄'
});
//=> '<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>'
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

##### value

HTML tag value.

##### selfClose *(Boolean)*

Specify to selfClose void tags or not. *default: false*



## Related

- [stringify-attributes](https://github.com/sindresorhus/stringify-attributes) - Turn an object into a string of HTML attributes


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
