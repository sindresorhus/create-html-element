import test from 'ava';
import createHtmlElement from './index.js';

test('creates element', t => {
	t.is(
		createHtmlElement({
			name: 'h1',
			attributes: {
				class: 'unicorn',
				rainbow: true,
				horse: false,
				number: 1,
				multiple: ['a', 'b'],
			},
			html: '🦄',
		}),
		'<h1 class="unicorn" rainbow number="1" multiple="a b">🦄</h1>',
	);

	t.is(
		createHtmlElement({}),
		'<div></div>',
	);
});

test('creates void element', t => {
	t.is(
		createHtmlElement({
			name: 'img',
			attributes: {
				foo: 'bar',
			},
			html: 'noop',
		}),
		'<img foo="bar">',
	);
});

test('supports boolean and non-string attribute values', t => {
	t.is(
		createHtmlElement({
			attributes: {
				foo: true,
				bar: false,
				one: 1,
			},
		}),
		'<div foo one="1"></div>',
	);
});

test('escapes text content', t => {
	t.is(
		createHtmlElement({text: '🦄 & 🐐'}),
		'<div>🦄 &amp; 🐐</div>',
	);
});

test('renders children', t => {
	t.is(
		createHtmlElement({
			name: 'div',
			children: [
				'<unsafe>',
				{
					name: 'iframe',
					attributes: {
						src: 'https://example.com',
					},
				},
				{
					name: 'span',
					text: 'Label here <em>plz</em>',
				},
			],
		}),
		'<div>&lt;unsafe&gt;<iframe src="https://example.com"></iframe><span>Label here &lt;em&gt;plz&lt;/em&gt;</span></div>',
	);
});

test('children is mutually exclusive with html and text', t => {
	t.throws(() => {
		createHtmlElement({
			html: 'foo',
			children: ['bar'],
		});
	});

	t.throws(() => {
		createHtmlElement({
			text: 'foo',
			children: ['bar'],
		});
	});
});

test('throws on invalid child types', t => {
	t.throws(() => {
		createHtmlElement({
			children: [['nested']],
		});
	});

	t.throws(() => {
		createHtmlElement({
			children: [undefined],
		});
	});
});
