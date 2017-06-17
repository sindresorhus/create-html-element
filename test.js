import test from 'ava';
import m from '.';

test('creates element', t => {
	t.is(
		m({
			name: 'h1',
			attributes: {
				class: 'unicorn',
				rainbow: true,
				horse: false,
				number: 1,
				multiple: ['a', 'b']
			},
			value: '🦄'
		}),
		'<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>'
	);

	t.is(
		m({}),
		'<div></div>'
	);
});

test('creates void element', t => {
	t.is(
		m({
			name: 'img',
			attributes: {
				foo: 'bar'
			},
			value: 'noop'
		}),
		'<img foo="bar">'
	);
});

test('supports boolean and non-string attribute values', t => {
	t.is(
		m({
			attributes: {
				foo: true,
				bar: false,
				one: 1
			}
		}),
		'<div foo one="1"></div>'
	);
});
