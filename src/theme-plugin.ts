import * as PostCSS from 'postcss';

import { Palette, SharedOptions } from './types';

export type Themes = Record<string, Palette>;

export interface ThemePluginOptions {
	themes: Themes;
	defaultThemeName: string;
}

export const enum Constants {
	FunctionName = 'themedColor',
}

export class ChainCycledError extends Error {
	public chain: string[];
	public constructor(chain: string[]) {
		super(`Detected cycled color chain:\n\t[${chain}]`);
		this.chain = chain;
	}
}

export function resolveColorDeep(name: string, theme: Palette, defaultTheme: Palette): string | null {
	let color: string | null = name;
	const chain: string[] = [name];
	const set = new Set<string>(chain);
	while (true) {
		color = resolveColor(color, theme, defaultTheme);
		if (color === null) {
			return chain[chain.length - 1];
		}
		chain.push(color);

		if (set.has(color)) {
			throw new ChainCycledError(chain);
		}
		set.add(color);
	}
}

export function resolveColor(name: string, theme: Palette, defaultTheme: Palette): string | null {
	const color = theme[name];
	if (color !== undefined) {
		return color;
	}

	const defaultColor = defaultTheme[name];
	if (defaultColor !== undefined) {
		return defaultColor;
	}

	return null;
}

export function createPlugin(shared: SharedOptions): PostCSS.Plugin<ThemePluginOptions> {
	return PostCSS.plugin('postcss-theme', (options?: ThemePluginOptions) => {
		return (root: PostCSS.Root) => {

		};
	});
}