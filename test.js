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

test('returns default element without arguments', t => {
	t.is(
		createHtmlElement(),
		'<div></div>',
	);
});

test('html and text are mutually exclusive', t => {
	t.throws(() => {
		createHtmlElement({
			html: 'foo',
			text: 'bar',
		});
	});
});

test('throws when children is not an array', t => {
	t.throws(() => {
		createHtmlElement({
			children: 'not an array',
		});
	}, {instanceOf: TypeError});
});

test('void element ignores children without building or validating them', t => {
	t.is(
		createHtmlElement({
			name: 'img',
			children: [['nested']],
		}),
		'<img>',
	);
});

test('renders nested children', t => {
	t.is(
		createHtmlElement({
			name: 'ul',
			children: [
				{
					name: 'li',
					children: ['a'],
				},
				{
					name: 'li',
					text: 'b',
				},
			],
		}),
		'<ul><li>a</li><li>b</li></ul>',
	);
});

test('renders empty children array', t => {
	t.is(
		createHtmlElement({children: []}),
		'<div></div>',
	);
});

test('does not escape html content', t => {
	t.is(
		createHtmlElement({html: '<em>unescaped</em> & raw'}),
		'<div><em>unescaped</em> & raw</div>',
	);
});

test('rejects tag names that would inject markup', t => {
	t.throws(() => {
		createHtmlElement({name: 'div><script>alert(1)</script><div'});
	});

	t.throws(() => {
		createHtmlElement({name: 'div onload=alert(1)'});
	});

	t.throws(() => {
		createHtmlElement({name: ''});
	});

	// The same validation protects nested children.
	t.throws(() => {
		createHtmlElement({
			children: [
				{name: '<script>'},
			],
		});
	});
});

test('allows standard and custom element tag names', t => {
	t.is(createHtmlElement({name: 'h1'}), '<h1></h1>');
	t.is(createHtmlElement({name: 'my-element'}), '<my-element></my-element>');
	t.is(createHtmlElement({name: 'my.element-foo'}), '<my.element-foo></my.element-foo>');
	t.is(createHtmlElement({name: 'my-element_foo'}), '<my-element_foo></my-element_foo>');
	t.is(
		createHtmlElement({
			children: [
				{name: 'my-element_foo'},
			],
		}),
		'<div><my-element_foo></my-element_foo></div>',
	);
});

test('escapes attribute names and values', t => {
	t.is(
		createHtmlElement({
			attributes: {
				title: '"><script>alert(1)</script>',
			},
		}),
		'<div title="&quot;&gt;&lt;script&gt;alert(1)&lt;/script&gt;"></div>',
	);
});
