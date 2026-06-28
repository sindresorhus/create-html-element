import {expectType, expectError} from 'tsd';
import createHtmlElement from './index.js';

expectType<string>(createHtmlElement());
expectType<string>(createHtmlElement({
	attributes: {
		class: 'unicorn',
		rainbow: true,
		horse: false,
		number: 1,
		multiple: [
			'a',
			'b',
		],
	},
}));
expectType<string>(createHtmlElement({name: 'foo'}));
expectType<string>(createHtmlElement({html: '🦄'}));
expectType<string>(createHtmlElement({text: 'Hello <em>World</em>'}));
expectType<string>(createHtmlElement({
	children: [
		'text',
		{
			name: 'span',
			text: 'bar',
		},
	],
}));
expectError(createHtmlElement({children: [['nested']]}));
expectError(createHtmlElement({html: '🦄', text: 'Hello <em>World</em>'}));
expectError(createHtmlElement({html: '🦄', children: ['bar']}));
expectError(createHtmlElement({text: 'Hello <em>World</em>', children: ['bar']}));
