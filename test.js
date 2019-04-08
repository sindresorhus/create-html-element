import test from 'ava';
import createHtmlElement from '.';

test('creates element', t => {
	t.is(
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
		}),
		'<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>'
	);

	t.is(
		createHtmlElement({}),
		'<div></div>'
	);
});

test('creates void element', t => {
	t.is(
		createHtmlElement({
			name: 'img',
			attributes: {
				foo: 'bar'
			},
			html: 'noop'
		}),
		'<img foo="bar">'
	);
});

test('supports boolean and non-string attribute values', t => {
	t.is(
		createHtmlElement({
			attributes: {
				foo: true,
				bar: false,
				one: 1
			}
		}),
		'<div foo one="1"></div>'
	);
});

test('escapes text content', t => {
	t.is(
		createHtmlElement({text: '🦄 & 🐐'}),
		'<div>🦄 &amp; 🐐</div>'
	);
});
