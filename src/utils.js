"use strict";
function parseArgs(argString, argCount, allowSingleQuote = true) {
    const re = allowSingleQuote ? /\s*(?:("|')([^]*?)\1|(\S+))\s*/g : /\s*(?:(")([^]*?)"|(\S+))\s*/g;
    const result = [];
    let match = [];
    argCount = argCount || argString.length;
    while (--argCount && (match = re.exec(argString)))
        result.push(match[2] || match[3]);
    if (match && re.lastIndex < argString.length) {
        const re2 = allowSingleQuote ? /^("|')([^]*)\1$/g : /^(")([^]*)"$/g;
        result.push(argString.substr(re.lastIndex).replace(re2, '$2'));
    }
    return result;
}
exports.parseArgs = parseArgs;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseArgs;
