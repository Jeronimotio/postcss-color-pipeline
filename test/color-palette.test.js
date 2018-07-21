const { getColorWords } = require('../lib/color-palette');
const { legacyReplace, variableReplace } = require('../lib/color-palette/utils');

test('getColorWords returns color nodes from border value', () => {
	const nodes = getColorWords('color', '1px solid color-white');

	expect(nodes.length).toEqual(1);
	expect(nodes[0].value).toEqual('color-white');
});


test('getColorWords returns color nodes from simple value', () => {
	const nodes = getColorWords('color', 'color-white');

	expect(nodes.length).toEqual(1);
	expect(nodes[0].value).toEqual('color-white');
});

test('getColorWords returns color nodes with repeats', () => {
	const nodes = getColorWords('color', '1px solid color-white 1px solid color-white 1px solid color-black');
	expect(nodes.length).toEqual(3);

	const [first, second, third] = nodes;

	expect(first.value).toEqual('color-white');
	expect(second.value).toEqual('color-white');
	expect(third.value).toEqual('color-black');
});

test('replaceLegacy should replace color into value', () => {
	const string = 'color-white color-black 1px solid';

	const replaced = legacyReplace(string, [['color-white', '#FFF'], ['color-black', '#000']]);

	expect(replaced).toEqual('#FFF #000 1px solid');
});

test('replaceLegacy should replace with repeats', () => {
	const string = '1px solid color-white 1px solid color-white 1px solid color-black';

	const first = legacyReplace(string, [['color-white', '#FFF'], ['color-white', '#FFF'], ['color-black', '#000']]);
	expect(first).toEqual('1px solid #FFF 1px solid #FFF 1px solid #000');

	const second = legacyReplace(string, [['color-white', '#FFF'], ['color-black', '#000']]);
	expect(second).toEqual('1px solid #FFF 1px solid color-white 1px solid #000');
});

test('variableReplace should replace color into value', () => {
	const string = 'color-white color-black 1px solid';

	const replaced = variableReplace(string, [['color-white', '#FFF'], ['color-black', '#000']]);

	expect(replaced).toEqual('var(--color-white) var(--color-black) 1px solid');
});

test('variableReplace should replace with repeats', () => {
	const string = '1px solid color-white 1px solid color-white 1px solid color-black';

	const first = variableReplace(string, [['color-white', '#FFF'], ['color-white', '#FFF'], ['color-black', '#000']]);
	expect(first).toEqual('1px solid var(--color-white) 1px solid var(--color-white) 1px solid var(--color-black)');

	const second = variableReplace(string, [['color-white', '#FFF'], ['color-black', '#000']]);
	expect(second).toEqual('1px solid var(--color-white) 1px solid color-white 1px solid var(--color-black)');
});