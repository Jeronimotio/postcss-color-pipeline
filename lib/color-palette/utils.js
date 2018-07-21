"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function legacyReplace(value, replaces) {
    replaces.forEach(function (_a) {
        var name = _a[0], color = _a[1];
        value = value.replace(name, color);
    });
    return value;
}
exports.legacyReplace = legacyReplace;
function replaceFromIndex(input, value, replace, index) {
    return input.slice(0, index) + input.slice(index).replace(value, replace);
}
function variableReplace(value, replaces) {
    var index = 0;
    replaces.forEach(function (_a) {
        var name = _a[0];
        var replace = "var(--" + name + ")";
        value = replaceFromIndex(value, name, replace, index);
        index = value.indexOf(name) + replace.length - name.length;
    });
    return value;
}
exports.variableReplace = variableReplace;
//# sourceMappingURL=utils.js.map