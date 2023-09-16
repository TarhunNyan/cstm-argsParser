const tPARAM = 0, tLONG = 1, tSHORT = 2;
const cCHARCODE_ZERO = '0'.charCodeAt(0), cCHARCODE_NINE = '9'.charCodeAt(0);

function argsParser(args) {
    // const argv = argv.slice(2);
    let result = args;

    console.log(result);
    if (true) { result = argsParser__preParse(result) }
    console.log(result);
    if (true) { result = argsParser__updateKeys(result) }
    console.log(result);
    if (true) { result = argsParser__compileParse(result) }
    // console.log(result);

    return result;
}

function argsParser__preParse(args) {
    return args.map((el) => {
        let isShort = false, isLong = false, isParam = false;

        if (el[0] === "-") { isShort = true }
        if (isShort && el[1] === "-") { isLong = true; isShort = false }
        if (isShort === false && isLong === false) { isParam = true }

        if (isParam) { return { type: tPARAM, value: el } }
        if (isLong) { return { type: tLONG, value: el.slice(2) } }
        if (isShort) { return { type: tSHORT, value: el.slice(1) } }
    });
}

function argsParser__updateKeys(args) {
    let result = [];

    for (let i = 0; i < args.length; i++) {
        const el = args[i];
        if (el.type === tLONG) { result = argsParser__updateKeys__long(el, result) }
        if (el.type === tSHORT) { result = argsParser__updateKeys__short(el, result) }
        if (el.type === tPARAM) { result.push(el) }
    }

    return result;
}

function argsParser__updateKeys__long(el, result) {
    const expr = findExpression(el.value);
    result.push({ type: tLONG, value: expr[0] });
    result.push({ type: tPARAM, value: expr[1] });
    return result;
}

function argsParser__updateKeys__short(el, result) {
    const value = el.value;
    for (let i = 0; i < value.length; i++) {
        const charcode = value[i];

        if (!isNumericSymbol(charcode)) { result.push({ type: tSHORT, value: value[i] }); }
        if (isNumericSymbol(charcode)) {
            const numericStr = getNumericString(value, i);
            result.push({ type: tPARAM, value: numericStr });
            i += numericStr.length - 1;
            continue;
        }
    }

    return result;
}

function argsParser__compileParse(args) {
    let result = { params: [] };
    let key, value, isString = false, stringQuote = '\'';

    for (let i = 0; i < args.length; i++) {
        const el = args[i], type = el.type;
        const isNotParam = type === tLONG || type === tSHORT;
        const isParam = !isNotParam;

        console.log(key, value, isString)
        if (isNotParam && key == undefined) { key = el.value; continue; }
        if (isNotParam && key != undefined && value != undefined) { result[key] = value; key = el.value; value = undefined; continue; }
        if (isNotParam && key != undefined && value == undefined) { result[key] = true; key = el.value; continue; }

        debugger;
        if (isParam && !isString && (el.value[0] === '\'' || el.value[0] === '\"')) { isString = true; stringQuote = el.value[0]; value = el.value.slice(1); continue; }
        if (isParam && isString && el.value.at(-1) === stringQuote) { value += ' ' + el.value.slice(0, el.value.length - 1); isStart = false; }
        if (isParam && isString) { value += ' ' + el.value; continue; }

        if (isParam && key == undefined && value === undefined) { result['params'].push(el.value); continue; }
        if (isParam && key == undefined && value != undefined) { result['params'].push(value); result['params'].push(el.value); value = undefined; continue; }
        if (isParam && key != undefined && value === undefined) { value = el.value; continue; }
        if (isParam && key != undefined && value != undefined) { result[key] = value; key = undefined; value = el.value; continue; }
    }

    return result;
}

function findExpression(str) {
    const index = str.indexOf('=');

    if (index === -1) { return [str, true]; }
    if (index != -1) { return [str.slice(0, index), str.slice(index + 1)] }

    return [str, true];
}

function isNumericSymbol(str) {
    const s = str.charCodeAt(0);
    return s >= cCHARCODE_ZERO && s <= cCHARCODE_NINE;
}

function getNumericString(str, start = 0) {
    let i = start;
    for (let s = str[i]; i < str.length && isNumericSymbol(s); i++, s = str[i]) { }
    return str.slice(start, i);
}

module.exports = {
    argsParser
}