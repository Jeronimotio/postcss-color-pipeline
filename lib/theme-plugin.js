"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PostCSS = require("postcss");
var ChainCycledError = /** @class */ (function (_super) {
    __extends(ChainCycledError, _super);
    function ChainCycledError(chain) {
        var _this = _super.call(this, "Detected cycled color chain:\n\t[" + chain + "]") || this;
        _this.chain = chain;
        return _this;
    }
    return ChainCycledError;
}(Error));
exports.ChainCycledError = ChainCycledError;
function resolveColorDeep(name, theme, defaultTheme) {
    var color = name;
    var chain = [name];
    var set = new Set(chain);
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
exports.resolveColorDeep = resolveColorDeep;
function resolveColor(name, theme, defaultTheme) {
    var color = theme[name];
    if (color !== undefined) {
        return color;
    }
    var defaultColor = defaultTheme[name];
    if (defaultColor !== undefined) {
        return defaultColor;
    }
    return null;
}
exports.resolveColor = resolveColor;
function createPlugin(shared) {
    return PostCSS.plugin('postcss-theme', function (options) {
        return function (root) {
        };
    });
}
exports.createPlugin = createPlugin;
//# sourceMappingURL=theme-plugin.js.map