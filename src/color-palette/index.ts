import * as PostCSS from 'postcss';
import * as valueParser from 'postcss-value-parser';

import { Palette, SharedOptions } from '../types';
import { legacyReplace, ReplaceTuple, variableReplace } from './utils';

interface ColorPaletteOptions {
	prefix?: string;
	palette: Palette;
	process?: ProcessOptions;
}

interface ProcessOptions {
	useLegacyTransform?: boolean;
	useCssVariables?: boolean;
}

interface TransformOptions {
	declaration: PostCSS.Declaration;
	replaces: ReplaceTuple[];
}

function transformColorDeclaration({ declaration, replaces }: TransformOptions, proccess: ProcessOptions): void {
	if (proccess.useLegacyTransform) {
		const value = legacyReplace(declaration.value, replaces);
		declaration.cloneBefore({ value });
	}
	if (proccess.useCssVariables) {
		const value = variableReplace(declaration.value, replaces);
		declaration.cloneBefore({ value })
	}
	declaration.remove();
}

export type ParsedNode = any;

export function getColorWords(prefix: string, value: string): ParsedNode[] {
	const parsed = valueParser(value);
	const result: ParsedNode[] = [];

	parsed.walk((node: ParsedNode) => {
		if (node.type === 'word' && node.value.indexOf(prefix) === 0) {
			result.push(node);
		}
	});

	return result;
}

export function createPlugin(shared: SharedOptions): PostCSS.Plugin<ColorPaletteOptions> {
	const defaultOptions = {
		prefix: 'color',
		palette: {} as Palette,
		process: {
			useLegacyTransform: true,
			useCssVariables: true,
		},
	};
	return PostCSS.plugin(
		'postcss-color-palette',
		(options?: ColorPaletteOptions) => {
			const { palette, prefix, process } = {
				...defaultOptions,
				...options,
			};

			return (root: PostCSS.Root) => {
				root.walkDecls((declaration: PostCSS.Declaration) => {
					const colors = getColorWords(prefix, declaration.value);
					const replaces = colors.map((node): ReplaceTuple => {
						const name: string = node.value;
						const color = palette[name];

						if (color === undefined) {
							throw declaration.error(`Unknown color name ${name}`, { word: name });
						}

						return [name, color];
					});

					transformColorDeclaration({ declaration, replaces }, process);
				})
			};
	});
}