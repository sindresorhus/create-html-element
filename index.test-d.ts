import {expectType, expectError} from 'tsd';
import createHtmlElement = require('.');

expectType<string>(createHtmlElement());
expectType<string>(
	createHtmlElement({
		attributes: {
			class: 'unicorn',
			rainbow: true,
			horse: false,
			number: 1,
			multiple: ['a', 'b']
		}
	})
);
expectType<string>(createHtmlElement({name: 'foo'}));
expectType<string>(createHtmlElement({html: '🦄'}));
expectType<string>(createHtmlElement({text: 'Hello <em>World</em>'}));
expectError(createHtmlElement({html: '🦄', text: 'Hello <em>World</em>'}));
