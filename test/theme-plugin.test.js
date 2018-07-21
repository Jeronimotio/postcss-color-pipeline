const { resolveColor, resolveColorDeep, ChainCycledError } = require('../lib/theme-plugin');
const light = require('../fixtures/light-theme.json');
const dark = require('../fixtures/dark-theme.json');

test('resolve color should work', () => {
	expect(resolveColor('color-page-background', dark, light)).toEqual('color-black');
	expect(resolveColor('color-page-background', light, light)).toEqual('color-white');
	expect(resolveColor('color-brand', dark, light)).toEqual('color-blue');
	expect(resolveColor('color-unknown', dark, light)).toEqual(null);
	expect(resolveColor('color-unknown', light, light)).toEqual(null);
});

test('resolve color deep should work', () =>{
	expect(resolveColorDeep('color-chain-page-background', dark, light)).toEqual('color-black');
	// expect(resolveColorDeep('color-chain-page-background', light, light)).toEqual('color-white');
	// expect(resolveColorDeep('color-chain-brand', dark, light)).toEqual('color-blue');
	// expect(resolveColorDeep('color-chain-brand', light, light)).toEqual('color-blue');
	// expect(resolveColorDeep('color-chain-brand-fallback', dark, light)).toEqual('color-blue');
	// expect(resolveColorDeep('color-chain-brand-fallback', light, light)).toEqual('color-blue');
	// expect(resolveColorDeep('color-unknown', dark, light)).toEqual('color-unknown');
	// expect(resolveColorDeep('color-unknown', light, light)).toEqual('color-unknown');
	//
	// expect(resolveColorDeep('color-cycled', dark, light)).toThrow(ChainCycledError);
	// expect(resolveColorDeep('color-cycled', light, light)).toThrow(ChainCycledError);
	// expect(resolveColorDeep('color-cycled-2', dark, light)).toThrow(ChainCycledError);
});