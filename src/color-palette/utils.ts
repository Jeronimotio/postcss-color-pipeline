export type ReplaceTuple = [string, string];

export function legacyReplace(value: string, replaces: ReplaceTuple[]): string {
	replaces.forEach(([name, color]) => {
		value = value.replace(name, color);
	});
	return value;
}

function replaceFromIndex(input: string, value: string, replace: string, index: number): string {
	return input.slice(0, index) + input.slice(index).replace(value, replace);
}

export function variableReplace(value: string, replaces: ReplaceTuple[]): string {
	let index = 0;
	replaces.forEach(([name]) => {
		const replace = `var(--${name})`;
		value = replaceFromIndex(value, name, replace, index);
		index = value.indexOf(name) + replace.length - name.length;
	});
	return value;
}