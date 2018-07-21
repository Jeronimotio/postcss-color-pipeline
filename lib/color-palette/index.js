"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PostCSS = require("postcss");
var valueParser = require("postcss-value-parser");
var utils_1 = require("./utils");
function transformColorDeclaration(_a, proccess) {
    var declaration = _a.declaration, replaces = _a.replaces;
    if (proccess.useLegacyTransform) {
        var value = utils_1.legacyReplace(declaration.value, replaces);
        declaration.cloneBefore({ value: value });
    }
    if (proccess.useCssVariables) {
        var value = utils_1.variableReplace(declaration.value, replaces);
        declaration.cloneBefore({ value: value });
    }
    declaration.remove();
}
function getColorWords(prefix, value) {
    var parsed = valueParser(value);
    var result = [];
    parsed.walk(function (node) {
        if (node.type === 'word' && node.value.indexOf(prefix) === 0) {
            result.push(node);
        }
    });
    return result;
}
exports.getColorWords = getColorWords;
function createPlugin(shared) {
    var defaultOptions = {
        prefix: 'color',
        palette: {},
        process: {
            useLegacyTransform: true,
            useCssVariables: true,
        },
    };
    return PostCSS.plugin('postcss-color-palette', function (options) {
        var _a = __assign({}, defaultOptions, options), palette = _a.palette, prefix = _a.prefix, process = _a.process;
        return function (root) {
            root.walkDecls(function (declaration) {
                var colors = getColorWords(prefix, declaration.value);
                var replaces = colors.map(function (node) {
                    var name = node.value;
                    var color = palette[name];
                    if (color === undefined) {
                        throw declaration.error("Unknown color name " + name, { word: name });
                    }
                    return [name, color];
                });
                transformColorDeclaration({ declaration: declaration, replaces: replaces }, process);
            });
        };
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=index.js.map