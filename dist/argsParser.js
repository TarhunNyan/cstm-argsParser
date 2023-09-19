"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsParser = void 0;
var AGRS_TYPE;
(function (AGRS_TYPE) {
    AGRS_TYPE[AGRS_TYPE["NONE"] = 0] = "NONE";
    AGRS_TYPE[AGRS_TYPE["PARAM"] = 1] = "PARAM";
    AGRS_TYPE[AGRS_TYPE["LONG"] = 2] = "LONG";
    AGRS_TYPE[AGRS_TYPE["SHORT"] = 3] = "SHORT";
})(AGRS_TYPE || (AGRS_TYPE = {}));
var STRING_CONSTANTS;
(function (STRING_CONSTANTS) {
    STRING_CONSTANTS[STRING_CONSTANTS["CHARCODE_ZERO"] = '0'.charCodeAt(0)] = "CHARCODE_ZERO";
    STRING_CONSTANTS[STRING_CONSTANTS["CHARCODE_NINE"] = '9'.charCodeAt(0)] = "CHARCODE_NINE";
})(STRING_CONSTANTS || (STRING_CONSTANTS = {}));
function argsCurrent() {
    const args = process.argv.slice(2);
    return argsParser(args);
}
exports.default = argsCurrent;
function argsParser(args) {
    let preParse;
    let updateKeys;
    let result;
    if (true) {
        preParse = argsParser__preParse(args);
    }
    if (true) {
        updateKeys = argsParser__updateKeys(preParse);
    }
    if (true) {
        result = argsParser__compileParse(updateKeys);
    }
    return result;
}
exports.argsParser = argsParser;
function argsParser__preParse(args) {
    return args.map((el) => {
        let isShort = false, isLong = false, isParam = false;
        if (el[0] === "-") {
            isShort = true;
        }
        if (isShort && el[1] === "-") {
            isLong = true;
            isShort = false;
        }
        if (isShort === false && isLong === false) {
            isParam = true;
        }
        if (isParam) {
            return { type: AGRS_TYPE.PARAM, value: el };
        }
        if (isLong) {
            return { type: AGRS_TYPE.LONG, value: el.slice(2) };
        }
        if (isShort) {
            return { type: AGRS_TYPE.SHORT, value: el.slice(1) };
        }
        return { type: AGRS_TYPE.NONE, value: '' };
    });
}
function argsParser__updateKeys(args) {
    let result = [];
    for (let i = 0; i < args.length; i++) {
        const el = args[i];
        if (el.type === AGRS_TYPE.LONG) {
            result = argsParser__updateKeys__long(el, result);
        }
        if (el.type === AGRS_TYPE.SHORT) {
            result = argsParser__updateKeys__short(el, result);
        }
        if (el.type === AGRS_TYPE.PARAM) {
            result.push(el);
        }
    }
    result.push({ type: AGRS_TYPE.NONE, value: 'end' });
    return result;
}
function argsParser__updateKeys__long(el, result) {
    const expr = findExpression(el.value);
    if (true) {
        result.push({ type: AGRS_TYPE.LONG, value: expr[0] });
    }
    if (typeof expr[1] === 'string') {
        result.push({ type: AGRS_TYPE.PARAM, value: expr[1] });
    }
    return result;
}
function argsParser__updateKeys__short(el, result) {
    const value = el.value;
    for (let i = 0; i < value.length; i++) {
        const charcode = value[i];
        if (!isNumericSymbol(charcode)) {
            result.push({ type: AGRS_TYPE.SHORT, value: value[i] });
        }
        if (isNumericSymbol(charcode)) {
            const numericStr = getNumericString(value, i);
            result.push({ type: AGRS_TYPE.PARAM, value: numericStr });
            i += numericStr.length - 1;
            continue;
        }
    }
    return result;
}
function argsParser__compileParse(args) {
    let result = { _: [] };
    let key, value, stringQuote = '\'', isString = false;
    for (let i = 0; i < args.length; i++) {
        const el = args[i], type = el.type;
        const isNotParam = type === AGRS_TYPE.LONG || type === AGRS_TYPE.SHORT || type === AGRS_TYPE.NONE;
        const isParam = !isNotParam;
        const firstSymbol = el.value[0], lastSymbol = el.value[el.value.length - 1], isQuoteStart = (firstSymbol === '\'' || firstSymbol === '\"');
        if (isNotParam && isString && type === AGRS_TYPE.SHORT) {
            value += ' -' + el.value;
            continue;
        }
        if (isNotParam && isString && type === AGRS_TYPE.LONG) {
            value += ' --' + el.value;
            continue;
        }
        if (isNotParam && key == undefined && value != undefined) {
            key = el.value;
            result['_'].push(value);
            continue;
        }
        if (isNotParam && key == undefined && value == undefined) {
            key = el.value;
            continue;
        }
        if (isNotParam && key != undefined && value != undefined) {
            result[key] = value;
            key = el.value;
            value = undefined;
            continue;
        }
        if (isNotParam && key != undefined && value == undefined) {
            result[key] = true;
            key = el.value;
            continue;
        }
        if (isParam && !isString && lastSymbol === firstSymbol && isQuoteStart) {
            value = el.value.slice(1, el.value.length - 1);
            continue;
        }
        if (isParam && !isString && isQuoteStart) {
            isString = true;
            stringQuote = el.value[0];
            value = el.value.slice(1);
            continue;
        }
        if (isParam && isString && lastSymbol === stringQuote) {
            value += ' ' + el.value.slice(0, el.value.length - 1);
            isString = false;
            continue;
        }
        if (isParam && isString) {
            value += ' ' + el.value;
            continue;
        }
        if (isParam && key == undefined && value === undefined) {
            result['_'].push(el.value);
            continue;
        }
        if (isParam && key == undefined && value != undefined) {
            result['_'].push(value);
            result['_'].push(el.value);
            value = undefined;
            continue;
        }
        if (isParam && key != undefined && value === undefined) {
            result[key] = el.value;
            key = undefined;
            continue;
        }
        if (isParam && key != undefined && value != undefined) {
            result[key] = value;
            key = undefined;
            value = el.value;
            continue;
        }
    }
    return result;
}
function findExpression(str) {
    const index = str.indexOf('=');
    if (index === -1) {
        return [str, true];
    }
    if (index != -1) {
        return [str.slice(0, index), str.slice(index + 1)];
    }
    return [str, true];
}
function isNumericSymbol(str) {
    const s = str.charCodeAt(0);
    return s >= STRING_CONSTANTS.CHARCODE_ZERO && s <= STRING_CONSTANTS.CHARCODE_NINE;
}
function getNumericString(str, start = 0) {
    let i = start;
    for (let s = str[i]; i < str.length && isNumericSymbol(s); i++, s = str[i]) { }
    return str.slice(start, i);
}
