import { argsParser, argsString } from '../src/argsParser';

describe(
    "Тесты на парсинг аргументов пришедших из командной строки, argsParser:",
    () => {
        let testCase: {cli: string; result: object; isOnly?: boolean; }[];

        testCase = [
            {
                cli: "--test-param",
                result: {
                    "test-param": true,
                    _: []
                }
            },
            {
                cli: "--test-param 10",
                result: {
                    "test-param": "10",
                    _: []
                }
            },
            {
                cli: "--test-param=10.5",
                result: {
                    "test-param": "10.5",
                    _: []
                }
            },
            {
                cli: "--test-param --help",
                result: {
                    "test-param": true, "help": true,
                    _: []
                }
            },
            {
                cli: "-t",
                result: {
                    "t": true,
                    _: []
                }
            },
            {
                cli: "-tnk",
                result: {
                    "t": true, "n": true, "k": true,
                    _: []
                }
            },
            {
                cli: "-t 10",
                result: {
                    "t": "10",
                    _: []
                }
            },
            {
                cli: "-t10",
                result: {
                    "t": "10",
                    _: []
                }
            },
            {
                cli: "-tn10k",
                result: {
                    "t": true, "n": "10", "k": true,
                    _: []
                }
            },
            {
                cli: "-kjs3.25op5z120",
                result: {
                    "k": true, "j": true, "s": "3.25", "o": true, "p": "5", "z": "120",
                    _: []
                }
            },
            {
                cli: "--text=\"String param in args\"",
                result: {
                    text: "String param in args",
                    _: []
                }
            },
            {
                cli: "--text=\'String param in args\'",
                result: {
                    text: "String param in args",
                    _: []
                }
            },
            {
                cli: "-t \"String param in args\" --val 10",
                result: {
                    t: "String param in args", val: "10",
                    _: []
                }
            },
            {
                cli: "\'String param in args\' 10",
                result: {
                    _: ["String param in args", "10"],
                }
            },
            {
                cli: "10 20 \"30 40\" 50",
                result: {
                    _: ["10", "20", "30 40", "50"],
                }
            },
            {
                cli: "--test \"It is: --toster text\"",
                result: {
                    test: "It is: --toster text",
                    _: [],
                }
            },
            {
                cli: "--test \"\"",
                result: {
                    test: "",
                    _: [],
                }
            },
            {
                cli: "--test \"HI! What's your name?",
                result: {
                    test: "HI! What's your name?",
                    _: [],
                }
            },
        ];

        testCase.forEach((el) => {
            const args = el.cli.split(' ');
            const result = el.result;

            if (el.isOnly) { test.only(el.cli, () => { expect(argsParser(args)).toEqual(result) }) }
            if (el.isOnly == false || el.isOnly == undefined) {
                test(el.cli, () => { expect(argsParser(args)).toEqual(result) })
            }
        })
    }
)

test(
    'Проверка работы с строкой, argsString',
    () => {
        expect( argsString('--example -h --value 100')).toEqual({
            example: true,
            h: true,
            value: "100",
            _: [],
        })
    }
)
